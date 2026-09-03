# Shop Task

An educational online-store application with separate catalog and order services.

## Project Components

| Directory | Technologies | Purpose |
| --- | --- | --- |
| `catalog-api` | ASP.NET Core 10, Entity Framework Core, SQL Server | Serves the catalog: categories and products. |
| `orders-api` | Express 5, TypeScript, Mongoose, MongoDB | Creates and stores orders. |
| `client` | React 19, TypeScript, Vite, React Router, Redux Toolkit, Tailwind CSS | Provides the catalog, cart, checkout, and order-history UI. |

`docker-compose.yml` defines containers for SQL Server, MongoDB, and all three applications. Database data is persisted in named Docker volumes.

## Catalog API: ASP.NET Core and SQL Server

The service uses `AppDbContext` with SQL Server and applies EF Core migrations at startup. The database contains two related entities:

- **Category**: `id`, `name`; a category contains many products.
- **Product**: `id`, `name`, `price`, `imageUrl`, `categoryId`; prices use precision `18,2`.

The initial migration adds four grocery categories and 20 products. `CatalogController` exposes the following API:

| Method | URL | Result |
| --- | --- | --- |
| `GET` | `/api/catalog/categories` | A list of categories (`id`, `name`), sorted by name. |
| `GET` | `/api/catalog/categories/{categoryId}/products` | Products in the specified category (`id`, `name`, `price`, `imageUrl`, `categoryId`), sorted by name. Returns `404` for an unknown category. |

By default, the local service runs at `http://localhost:5025`; Swagger UI is enabled. CORS permits the Vite client at `http://localhost:5173`.

## Orders API: Express and MongoDB

The Express service connects to MongoDB through Mongoose. It requires the following environment variables:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/shop-orders
CLIENT_URL=http://localhost:5173
```

MongoDB stores an order collection. Each order contains the customer name, email, address, item array, total price, and automatically generated `createdAt`/`updatedAt` fields. An order item stores the product ID, name, and price; category ID and name; and quantity.

| Method | URL | Result |
| --- | --- | --- |
| `POST` | `/api/orders` | Validates input and creates an order. Customer name, email, address, and at least one item are required; returns `201` and the created order. |
| `GET` | `/api/orders` | Returns all orders, newest first. |

## Client and State

The client uses the following routes:

| Route | Screen |
| --- | --- |
| `/` | Catalog: loads categories and products from Catalog API and allows selecting a product and quantity. |
| `/checkout` | Cart, total calculation, customer-data validation, and order creation through Orders API. |
| `/orders` | Order list from Orders API. |

Global state is implemented with Redux Toolkit. `cart` stores cart items: product data, category name, and quantity. The `addToCart`, `removeFromCart`, `changeQuantity`, and `clearCart` reducers manage the cart. Categories, products, selected values, loading states, and errors are local React page state.

API URLs are configured with Vite environment variables:

```env
VITE_CATALOG_API_URL=http://localhost:5025
VITE_ORDERS_API_URL=http://localhost:3001
```

The production client build uses the relative `/catalog-api` and `/orders-api` paths from `client/.env.production`.

## Local Setup

1. Start SQL Server and MongoDB, for example with Docker Compose, after setting `SQL_SA_PASSWORD` according to `.env.example`.
2. Run `dotnet run` in `catalog-api`.
3. Create an `.env` file in `orders-api` with the variables above, then run `npm install` and `npm run dev`.
4. Run `npm install` and `npm run dev` in `client`.
