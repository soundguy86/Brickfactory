# Deploy auf Hetzner via Caddy + Tailscale

Test-Deploy ohne Domain: **Caddy** serviert die Seite intern auf `:8080`,
**Tailscale** legt automatisch gültiges HTTPS darüber. Erreichbar nur in
deinem Tailnet — nichts ist öffentlich offen.

```
Browser ──HTTPS──▶ tailscale serve ──HTTP──▶ Caddy :8080 ──▶ /var/www/bandstage
   (im Tailnet)     (TLS automatisch)         (statisch)        (dist/)
```

---

## 0. Voraussetzungen

- Hetzner-Server mit Debian/Ubuntu, SSH-Zugang.
- **Tailscale** auf dem Server installiert & eingeloggt (`tailscale up`).
- In der Tailscale-Admin-Konsole aktiviert: **MagicDNS** + **HTTPS Certificates**
  (Settings → Features). Ohne das kann `tailscale serve` kein TLS ausstellen.

---

## 1. Einmalig: Server vorbereiten

Auf dem Server (per SSH):

```bash
# Caddy installieren (offizielles Repo)
sudo apt update
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy

# Zielverzeichnis für die Seite anlegen (deinem User gehörend → rsync ohne sudo)
sudo mkdir -p /var/www/bandstage /var/log/caddy
sudo chown -R "$USER":"$USER" /var/www/bandstage
```

Dann die Caddyfile aus diesem Repo auf den Server bringen und aktivieren:

```bash
# vom lokalen Rechner aus
scp deploy/Caddyfile tom@hetzner:/tmp/Caddyfile

# auf dem Server
sudo mv /tmp/Caddyfile /etc/caddy/Caddyfile
sudo systemctl restart caddy
sudo systemctl status caddy --no-pager
```

---

## 2. Einmalig: Tailscale HTTPS vorschalten

Auf dem Server:

```bash
tailscale serve --bg 8080      # proxyt https://<server>.<tailnet>.ts.net → :8080
tailscale serve status         # zeigt die fertige URL
```

Die ausgegebene URL (z. B. `https://hetzner.dein-tailnet.ts.net`) ist die
Test-Adresse — von jedem Gerät in deinem Tailnet aufrufbar, mit grünem Schloss.

> Stoppen später mit `tailscale serve --https=443 off`.

---

## 3. Bei jedem Deploy

Vom lokalen Rechner (SSH-Zugang zum Server vorausgesetzt):

```bash
SERVER=tom@hetzner ./deploy/deploy.sh
```

Das Skript baut `dist/`, synct es nach `/var/www/bandstage` und lädt Caddy neu.
`SERVER` ist dein SSH-Ziel — Tailscale-MagicDNS-Name oder die `100.x.x.x`-IP.

---

## Später: echte Domain + öffentliches HTTPS

1. A-Record der Domain auf die öffentliche Server-IP setzen, Port 80+443 offen.
2. In `/etc/caddy/Caddyfile` den `:8080`-Block durch den PROD-Block ersetzen
   (unten in der Datei auskommentiert) und deine Domain eintragen.
3. `sudo systemctl reload caddy` — Caddy holt das Let's-Encrypt-Zertifikat selbst.
4. Tailscale-Serve kann dann bleiben (interner Zugang) oder weg
   (`tailscale serve --https=443 off`).

---

## Troubleshooting

| Symptom | Check |
| --- | --- |
| 502 über Tailscale | Läuft Caddy? `sudo systemctl status caddy`, `curl -I localhost:8080` |
| Kein TLS / Zertifikatsfehler | HTTPS-Certificates im Tailscale-Admin aktiv? MagicDNS an? |
| Alter Build sichtbar | Hard-Reload; HTML ist `no-cache`, Assets sind gehasht |
| rsync „permission denied" | Gehört `/var/www/bandstage` deinem SSH-User? (siehe Schritt 1) |
