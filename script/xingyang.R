i=1
while(i<10){
  temp=system("grep 'localhost:7001' /etc/apache2/conf/httpd.conf",intern = T)
  if(length(temp)<4){
    system("sh /home/cancerbi/public_html/HNCDB/service.start.sh")
  } else {
    Sys.sleep(15)
  }
}
