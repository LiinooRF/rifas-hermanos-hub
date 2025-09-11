#!/bin/bash

# Script de autodeploy para Rifas Los Hermanos
# Para usar: ./deploy.sh

set -e

echo "🚀 Iniciando autodeploy de Rifas Los Hermanos..."

# Variables
DOMAIN="rifaloshermanos.cl"
PROJECT_DIR="/var/www/rifaloshermanos"
NGINX_CONFIG="/etc/nginx/sites-available/rifaloshermanos"
NGINX_ENABLED="/etc/nginx/sites-enabled/rifaloshermanos"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para logging
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

# Verificar si se ejecuta como root
if [[ $EUID -ne 0 ]]; then
   error "Este script debe ejecutarse como root (sudo ./deploy.sh)"
fi

# Instalar dependencias si no están instaladas
log "Verificando dependencias..."

# Node.js y npm
if ! command -v node &> /dev/null; then
    log "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
fi

# Nginx
if ! command -v nginx &> /dev/null; then
    log "Instalando Nginx..."
    apt-get update
    apt-get install -y nginx
fi

# Certbot para SSL
if ! command -v certbot &> /dev/null; then
    log "Instalando Certbot..."
    apt-get install -y certbot python3-certbot-nginx
fi

# Crear directorio del proyecto
log "Configurando directorio del proyecto..."
mkdir -p $PROJECT_DIR

# Verificar si existe el código fuente
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
fi

# Instalar dependencias y construir el proyecto
log "Instalando dependencias..."
npm ci

log "Construyendo el proyecto..."
npm run build

# Copiar archivos construidos al directorio web
log "Copiando archivos al servidor web..."
rm -rf $PROJECT_DIR/*
cp -r dist/* $PROJECT_DIR/

# Configurar permisos
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR

# Crear configuración de Nginx
log "Configurando Nginx..."
cat > $NGINX_CONFIG << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $PROJECT_DIR;
    index index.html;

    # Configuración para SPA (Single Page Application)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Seguridad headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
EOF

# Habilitar el sitio
if [ ! -L $NGINX_ENABLED ]; then
    ln -s $NGINX_CONFIG $NGINX_ENABLED
fi

# Desactivar sitio por defecto de Nginx
if [ -L /etc/nginx/sites-enabled/default ]; then
    rm /etc/nginx/sites-enabled/default
fi

# Verificar configuración de Nginx
log "Verificando configuración de Nginx..."
nginx -t

# Reiniciar Nginx
log "Reiniciando Nginx..."
systemctl restart nginx
systemctl enable nginx

# Configurar SSL con Let's Encrypt
log "Configurando SSL con Let's Encrypt..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Configurar renovación automática de SSL
log "Configurando renovación automática de SSL..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Configurar firewall si está activo
if command -v ufw &> /dev/null && ufw status | grep -q "Status: active"; then
    log "Configurando firewall..."
    ufw allow 'Nginx Full'
    ufw allow ssh
fi

log "✅ ¡Deploy completado exitosamente!"
log "Tu sitio web está disponible en: https://$DOMAIN"
log ""
log "Para futuros deploys, simplemente ejecuta: sudo ./deploy.sh"
log ""
log "Comandos útiles:"
log "- Ver logs de Nginx: sudo tail -f /var/log/nginx/error.log"
log "- Reiniciar Nginx: sudo systemctl restart nginx"
log "- Verificar estado SSL: sudo certbot certificates"