# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

```bash
git clone https://github.com/mikepetrusha/03-CRUD-API.git
cd 03-CRUD-API
npm install
```
Create a `.env` file from the provided example:

```bash
cp .env.example .env
```
The `.env` file contains the port the server listens on:

```
PORT=4000
```
### `npm run start:dev`
To start the app in dev mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.


### `npm run start:prod`
For production mode


### `npm run test`
Run the test cases.

Launches a load balancer on the configured `PORT` and spawns worker processes (one per available CPU core minus one). Each request is forwarded to workers in round-robin order. All workers share a single in-memory database held by the primary process via IPC.

### `npm run  start:multi`


| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by id |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |




To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
