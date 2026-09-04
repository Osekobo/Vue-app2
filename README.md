# OBerlo Kenya

OBerlo is a Vue-based vehicle dealership website for a Nairobi car yard. It includes the public showroom, vehicle search, vehicle details, financing and test-drive forms, plus an admin area for inventory, purchases, sales and dashboard reporting.

The frontend is a single-page application. It talks to a separate HTTP API for products, authentication, purchases, sales and dashboard data.

## Stack

- Vue 3
- Vue Router
- Vite
- Axios
- Bootstrap 5
- Chart.js
- Tailwind CSS and PostCSS
- Nginx for the production container

## Requirements

For local development, install:

- Node.js 20 or newer
- npm 10 or newer
- A running OBerlo backend API

Docker Desktop is required only for the container workflow.

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd Vue-app
npm ci
```

Start the Vite development server:

```bash
npm run dev
```

The terminal will show the local URL, normally:

```text
http://localhost:5173
```

Vite's default host is local-only. To access it from another device on the same network, run:

```bash
npm run dev -- --host 0.0.0.0
```

## Backend API

The API base URL is set in `src/utils/config.js`:

```js
export const API_BASE_URL = "http://localhost:8000";
```

Start the backend on port `8000`, or update that value to the address of the API before building the frontend. The browser must be able to reach the API directly, so `localhost` means the computer running the browser, not the frontend container.

The frontend currently expects these routes:

| Method | Route            | Used for                       |
| ------ | ---------------- | ------------------------------ |
| POST   | `/login`         | User login and session cookie  |
| POST   | `/register`      | New account registration       |
| POST   | `/logout`        | Ending the current session     |
| GET    | `/products`      | Vehicle listings and inventory |
| GET    | `/products/:id`  | Vehicle details                |
| POST   | `/products`      | Adding a vehicle               |
| PUT    | `/products/:id`  | Updating a vehicle             |
| DELETE | `/products/:id`  | Removing a vehicle             |
| GET    | `/purchase`      | Purchase orders                |
| POST   | `/purchase`      | Creating a purchase order      |
| GET    | `/sales`         | Completed sales                |
| POST   | `/sales`         | Recording a sale               |
| GET    | `/dashboard/spp` | Sales performance data         |
| GET    | `/dashboard/rpp` | Remaining product data         |
| GET    | `/dashboard/ppp` | Profit by product              |
| GET    | `/dashboard/ppd` | Profit by day                  |

Requests that use authentication send cookies with `withCredentials: true`. The backend must therefore allow the frontend origin in its CORS configuration and must allow credentials. For local development, the usual frontend origin is `http://localhost:5173`.

## Available Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build in dist/
npm run preview   # Serve the production build locally
```

Run the build before deploying:

```bash
npm run build
npm run preview
```

## Docker

The Docker image builds the Vue application with Node and serves the generated files with Nginx. The Nginx configuration includes a fallback to `index.html`, which is needed for Vue Router history URLs such as `/shop` and `/dashboard`.

Build the image:

```bash
docker build -t oberlo-frontend .
```

Run it on port `8080`:

```bash
docker run --name oberlo-frontend -d -p 8080:80 oberlo-frontend
```

Open:

```text
http://localhost:8080
```

Useful commands:

```bash
docker ps
docker logs oberlo-frontend
docker stop oberlo-frontend
docker rm oberlo-frontend
```

To rebuild after code changes:

```bash
docker rm -f oberlo-frontend
docker build --no-cache -t oberlo-frontend .
docker run --name oberlo-frontend -d -p 8080:80 oberlo-frontend
```

## Running With a Backend Container

The frontend makes API calls from the user's browser. For that reason, the API address configured in `src/utils/config.js` must be reachable from the browser, even when both services are running in Docker.

For a local setup where the backend publishes port `8000` to the host, keep the frontend API URL as:

```text
http://localhost:8000
```

If the frontend is deployed to a server, change the API URL to the backend's public HTTPS address before building the image. Do not use a Docker service name such as `backend` in browser-side code unless the browser can resolve that name.

## Project Layout

```text
.
├── public/                 Static public files
├── src/
│   ├── components/         Shared public and admin navigation/footer
│   ├── router/             Vue Router configuration
│   ├── utils/              API configuration and shared data
│   └── views/              Application pages
├── Dockerfile              Multi-stage production image
├── nginx.conf              Nginx SPA routing and asset rules
├── index.html              Vite HTML entry point
├── package.json            Scripts and dependencies
├── package-lock.json       Locked dependency versions
└── vite.config.js          Vite configuration
```

## Kenyan Localisation

The customer-facing site is written for a Nairobi dealership. Prices use Kenyan shillings, contact details use the `+254` country code, and the public copy refers to Nairobi and delivery across Kenya. Replace the placeholder contact details in the shared components with the business's real details before publishing.

## Production Checklist

Before going live:

1. Set `API_BASE_URL` to the production API URL.
2. Configure the backend CORS origin and credentials policy.
3. Use HTTPS for both the frontend and API.
4. Replace placeholder phone, email and address details.
5. Confirm that the API's authentication cookie settings work over HTTPS.
6. Build and test the Docker image, including direct visits to `/shop`, `/dashboard` and `/products`.
7. Put the container behind a reverse proxy if the server also hosts other applications.

## Troubleshooting

### The page is blank or API data does not load

Check that the backend is running and that `src/utils/config.js` points to an address reachable from the browser. Open the browser developer tools and look for CORS or connection errors.

### Refreshing `/dashboard` returns a 404 in Docker

Make sure the image was built with the included `nginx.conf`. Its `try_files` rule sends Vue Router paths back to `index.html`.

### Login succeeds but the app behaves as logged out

Check that login and subsequent API requests use the same host, that the backend allows credentials, and that its session cookie has suitable `SameSite`, `Secure` and domain settings for the environment.

## License

This project is for OBerlo project and demonstration use. Add the appropriate licence before distributing it outside the project team.
