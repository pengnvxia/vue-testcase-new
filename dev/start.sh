#!/bin/bash

#删除存活的镜像
docker rm -f `docker ps -a |grep erp_setting_pc|awk '{print $1}'`
time=`date +%F-%H-%M-%S`

#进入命令构建镜像
cd /erp_setting_pc
docker build -t erp_setting_pc:$time ./

#启动镜像
docker run -d -p 18080:80 --name erp_setting_pc -v /code:/code -v /etc/localtime:/etc/localtime:ro -v /web/erp_setting_pc/log:/opt/openresty/nginx/logs -m 512M erp_setting_pc:$time

#删除目录内容
rm -rf /erp_setting_pc/*
