# Vue App

A static front-end web application for a vehicle showroom and dealership workflow. The project is built using plain HTML, CSS, JavaScript, and is containerized with Docker and Nginx for easy deployment.

## Project Overview

This repository contains the complete front-end UI for a business-facing automotive platform, including pages for:

- home and landing pages
- product and shop browsing
- sales and purchase workflows
- dashboard views
- customer login and registration flows
- financing and test-drive interactions

The main site entry points are the HTML files at the project root, while shared styles and assets are stored in the `assets/` and `static/` directories.

## Tech Stack

- HTML
- CSS
- JavaScript
- Docker
- Nginx
- Ubuntu base image for the container runtime

## Project Structure

```text
.
├── index.html
├── products.html
├── sales.html
├── purchases.html
├── dashboard.html
├── login.html
├── register.html
├── assets/
├── static/
├── Dockerfile
├── package.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- a modern browser
- Python 3 for local static serving, or
- Docker Desktop / Docker Engine installed

## Run Locally

You can serve the site directly with a simple static server:

```bash
python -m http.server 8000
```

Then open your browser to:

```text
http://localhost:8000
```

## Docker Build and Run

Build the Docker image from the project root:

```bash
docker build -t vue-pos .
```

Run the container:

```bash
docker run -d -p 8080:80 --name vue-app vue-pos
```

### What the Docker command means

- `-d` runs the container in the background
- `-p 8080:80` maps the host port to the container's Nginx port
- `--name vue-app` assigns a friendly container name
- `vue-pos` is the image name

## Useful Docker Commands

```bash
docker ps
 docker logs vue-app
 docker stop vue-app
 docker start vue-app
 docker rm vue-app
```

### Rebuild with a new image tag

```bash
docker build -t vue-pos-v2 .
```

### Run the same image on another port

```bash
docker run -d -p 3000:80 --name vue-app-2 vue-pos
```

## Docker Network Example

If you need the front-end to communicate with a backend container, you can create a shared network:

```bash
docker network create my_net
```

Example front-end run:

```bash
docker run -d --network my_net -p 8080:80 --name frontend vue-app
```

Example backend run:

```bash
docker run -d --network my_net -p 8000:8000 --name backend fastapi-app
```

## PostgreSQL Example

A sample database container can be started using:

```bash
docker run -d --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
```

If you want the database on a custom Docker network:

```bash
docker run --name my-postgres --network my_net -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
```

## Production Deployment Notes

This project is designed to serve static HTML files through Nginx. For a real production deployment, the usual flow is:

1. Build and tag the Docker image
2. Run it on a host or VM
3. Route traffic through Nginx or another reverse proxy
4. Secure the site using a valid domain and SSL certificate

A typical Nginx reverse proxy configuration would look like this:

```nginx
server {
    server_name amarahaus.co.ke www.amarahaus.co.ke;

    location / {
        proxy_pass http://207.154.206.4:8080;
    }
}
```

## SSL with Certbot

On Ubuntu, the following commands are commonly used for Nginx + Certbot setup:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d amarahaus.co.ke -d www.amarahaus.co.ke
```

## Notes

- The container is configured to use Nginx to serve the site.
- The project is currently static and front-end focused.
- Docker usage is intended for quick deployment and demonstration.
- If the site needs API integration later, a backend service can be connected through a Docker network.

## License

This repository is intended for project/demo use unless otherwise specified by the owner.
