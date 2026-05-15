FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y nginx
COPY . /var/www/html/
CMD service nginx start && tail -F /var/log/nginx/error.log

https://www.youtube.com/watch?v=pTFZFxd4hOI&t=2s
https://www.youtube.com/watch?v=pg19Z8LL06w
https://github.com/Dan10532/vue-app/blob/master/Dockerfile
https://docs.google.com/presentation/d/1PTj7kkfIAFILY8iJoB_UdEgvAK7fXyJGoF0zb-KuVsg/edit?slide=id.gb4c4d5d5dd_0_0#slide=id.gb4c4d5d5dd_0_0

https://chat.deepseek.com/share/d02t3wbr8dkgw23kkb
docker
nginx
letsencript
linux