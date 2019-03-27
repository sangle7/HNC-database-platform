sed -i 's/ServerAlias www.hncdb.cancerbio.info/ServerAlias www.hncdb.cancerbio.info\n  ProxyPass \/ http:\/\/localhost:7001\/\n  ProxyPassReverse \/ http:\/\/localhost:7001\//g' /etc/apache2/conf/httpd.conf
apachectl restart
