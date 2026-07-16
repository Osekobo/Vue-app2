FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y nginx
COPY . /var/www/html/
CMD service nginx start && tail -F /var/log/nginx/error.log

# Compare Vehicles
# Virtual Showroom / 360° View