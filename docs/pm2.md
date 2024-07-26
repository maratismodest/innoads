# PM2 scripts

start:

- pm2 start npm --name "innoads-site" -- start
- pm2 startup systemd
- pm2 save

stop:

- pm2 delete 0
- pm2 save --force