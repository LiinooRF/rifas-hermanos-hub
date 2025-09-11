# 🚀 Guía de Deploy - Rifas Los Hermanos

Esta guía te ayudará a desplegar tu aplicación en un VPS Ubuntu con Nginx y SSL.

## 📋 Requisitos Previos

- VPS Ubuntu 20.04+ con acceso root
- Dominio `rifalohermanos.cl` apuntando a la IP de tu VPS
- Acceso SSH al servidor

## 🛠️ Configuración Inicial (Solo una vez)

### 1. Preparar el servidor

```bash
# Conectarse al VPS
ssh root@tu-servidor-ip

# Subir los archivos del proyecto (desde tu máquina local)
scp -r . root@tu-servidor-ip:/root/rifaloshermanos/

# En el servidor, ir al directorio del proyecto
cd /root/rifaloshermanos

# Ejecutar configuración inicial
chmod +x setup-server.sh
sudo ./setup-server.sh
```

### 2. Configurar DNS

Asegúrate de que tu dominio tenga estos registros DNS:

```
Tipo: A
Nombre: @
Valor: [IP-de-tu-VPS]

Tipo: A  
Nombre: www
Valor: [IP-de-tu-VPS]
```

## 🚀 Deploy de la Aplicación

### Deploy inicial y futuros updates

```bash
# En el servidor, desde el directorio del proyecto
chmod +x deploy.sh
sudo ./deploy.sh
```

Este script automáticamente:
- ✅ Instala dependencias necesarias
- ✅ Construye el proyecto React
- ✅ Configura Nginx
- ✅ Instala certificado SSL gratuito
- ✅ Configura renovación automática de SSL
- ✅ Optimiza la configuración del servidor

## 📁 Estructura de Archivos en el Servidor

```
/var/www/rifaloshermanos/     # Archivos web servidos por Nginx
/etc/nginx/sites-available/rifaloshermanos  # Configuración de Nginx
/var/log/nginx/               # Logs de Nginx
```

## 🔧 Comandos Útiles

```bash
# Ver logs de Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar estado de servicios
sudo systemctl status nginx

# Verificar certificados SSL
sudo certbot certificates

# Renovar SSL manualmente (se renueva automáticamente)
sudo certbot renew

# Verificar configuración de Nginx
sudo nginx -t
```

## 🔄 Workflow de Updates

Para actualizar el sitio con nuevos cambios:

1. **Desde tu máquina local**, sube los cambios:
```bash
scp -r . root@tu-servidor-ip:/root/rifaloshermanos/
```

2. **En el servidor**, ejecuta el deploy:
```bash
cd /root/rifaloshermanos
sudo ./deploy.sh
```

## ⚡ Automatización con Git (Opcional)

Para automatizar aún más, puedes configurar Git:

```bash
# En el servidor
cd /root/rifaloshermanos
git init
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Crear script de auto-update
cat > auto-update.sh << 'EOF'
#!/bin/bash
git pull origin main
sudo ./deploy.sh
EOF

chmod +x auto-update.sh
```

## 🛡️ Seguridad

El script incluye configuraciones de seguridad:
- ✅ Headers de seguridad HTTP
- ✅ Firewall configurado
- ✅ SSL/TLS habilitado
- ✅ Rate limiting básico
- ✅ Compresión Gzip

## 🆘 Troubleshooting

### Error: "nginx: command not found"
```bash
sudo apt update && sudo apt install nginx -y
```

### Error: "certbot: command not found"
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### El sitio no carga
1. Verificar que el dominio apunta a tu IP
2. Verificar firewall: `sudo ufw status`
3. Ver logs: `sudo tail -f /var/log/nginx/error.log`

### SSL no funciona
1. Verificar DNS: `nslookup rifalohermanos.cl`
2. Regenerar certificado: `sudo certbot --nginx -d rifalohermanos.cl -d www.rifalohermanos.cl`

## 📞 Soporte

Si necesitas ayuda, revisa:
1. Los logs de Nginx
2. El estado de los servicios
3. La configuración DNS

¡Tu aplicación estará disponible en `https://rifalohermanos.cl`! 🎉