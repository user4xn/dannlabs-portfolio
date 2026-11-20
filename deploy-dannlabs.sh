#!/usr/bin/env bash
# Deploys the static portfolio and the /api/ proxy for the public Snowy agent.
# Run with: sudo bash deploy-dannlabs.sh
# Does NOT overwrite the nginx vhost (keeps certbot SSL blocks); it inserts an include once.
set -euo pipefail
ROOT="/home/user4xn/work/dannlabs-portfolio"
SITE="/var/www/dannlabs.my.id"
CONF="/etc/nginx/sites-available/dannlabs.my.id"

install -d -m 0755 "$SITE"
find "$SITE" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "$ROOT/index.html" "$ROOT/assets" "$ROOT/src" "$ROOT/robots.txt" "$ROOT/sitemap.xml" "$SITE/"
find "$SITE" -type d -exec chmod 755 {} +
find "$SITE" -type f -exec chmod 644 {} +

install -d -m 0755 /home/user4xn/snowy-public-data
install -m 0644 "$ROOT/public-agent/snowy-public.service" /etc/systemd/system/snowy-public.service
systemctl daemon-reload
systemctl enable --now snowy-public.service

install -d /etc/nginx/snippets
cat > /etc/nginx/snippets/snowy-api.conf <<'NGINX'
location /api/snowy {
    proxy_pass http://127.0.0.1:8787;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_buffering off;
    proxy_read_timeout 30s;
    client_max_body_size 4k;
}
location = /api/health { proxy_pass http://127.0.0.1:8787; }
NGINX

if ! grep -q 'snippets/snowy-api.conf' "$CONF"; then
  cp -a "$CONF" "$CONF.bak.$(date +%s)"
  # the 443 server block comes first in the certbot-managed file; add the include to every 'index index.html;' (443 + 80)
  sed -i 's#index index.html;#index index.html;\n    include snippets/snowy-api.conf;#' "$CONF"
fi
nginx -t
systemctl reload nginx
echo "deployed https://dannlabs.my.id"
