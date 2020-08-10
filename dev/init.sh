#!/bin/bash
cd / &&
./opt/openresty/nginx/sbin/nginx
tail -f /etc/hosts
