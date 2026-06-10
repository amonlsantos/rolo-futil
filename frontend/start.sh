#!/bin/bash
# Get Windows host IP from default gateway
WIN_IP=$(ip route | grep default | awk '{print $3}')

# Update proxy config with Windows IP
cat > proxy.conf.json << EOF
{
  "/api": {
    "target": "http://${WIN_IP}:8080",
    "secure": false,
    "changeOrigin": true
  }
}
EOF

echo "Proxy target set to http://${WIN_IP}:8080"
ng serve
