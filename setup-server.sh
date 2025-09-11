#!/bin/bash

# Script de configuración inicial del servidor
# Ejecutar SOLO la primera vez: sudo ./setup-server.sh

set -e

echo "🔧 Configuración inicial del servidor Ubuntu para Rifas Los Hermanos..."

# Variables
DOMAIN="rifaloshermanos.cl"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Verificar root
if [[ $EUID -ne 0 ]]; then
   error "Este script debe ejecutarse como root (sudo ./setup-server.sh)"
fi

log "Actualizando sistema..."
apt-get update && apt-get upgrade -y

log "Instalando dependencias básicas..."
apt-get install -y curl wget gnupg2 software-properties-common apt-transport-https ca-certificates

log "Configurando firewall básico..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https

log "Instalando Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

log "Instalando Nginx..."
apt-get install -y nginx

log "Instalando Certbot..."
apt-get install -y certbot python3-certbot-nginx

log "Configurando usuario deploy (opcional)..."
if ! id "deploy" &>/dev/null; then
    useradd -m -s /bin/bash deploy
    usermod -aG sudo deploy
    warn "Usuario 'deploy' creado. Configura su clave con: passwd deploy"
fi

log "Optimizando Nginx..."
# Backup de configuración original
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Configuración optimizada de Nginx
cat > /etc/nginx/nginx.conf << 'EOF'
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    # Gzip Settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
EOF

log "Habilitando servicios..."
systemctl enable nginx
systemctl start nginx

log "Creando estructura de directorios..."
mkdir -p /var/www/rifaloshermanos
mkdir -p /var/log/deploy
chown -R www-data:www-data /var/www/rifaloshermanos

log "Configurando logrotate..."
cat > /etc/logrotate.d/rifaloshermanos << EOF
/var/log/deploy/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
}
EOF

log "✅ Configuración inicial completada!"
log ""
log "Próximos pasos:"
log "1. Apunta tu dominio $DOMAIN a la IP de este servidor"
log "2. Sube tu código del proyecto a este servidor"
log "3. Ejecuta el script de deploy: sudo ./deploy.sh"
log ""
log "Información del sistema:"
log "- Node.js version: $(node --version)"
log "- npm version: $(npm --version)"
log "- Nginx version: $(nginx -v 2>&1)"
log "- Certbot version: $(certbot --version 2>&1)"