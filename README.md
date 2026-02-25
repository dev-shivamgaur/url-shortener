## URL Shortener

A simple URL shortener built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
It lets you create short links (with optional custom aliases and expiry) and handles redirects and basic analytics.

### Features

- **Create short URLs** for any valid `originalUrl`
- **Custom aliases** via `customAlias` (optional)
- **Expiration support** via `expiresAt` (optional)
- **Redirect** from short URL to original URL
- **Analytics endpoint** with click count and timestamps

### Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Other libs**: `dotenv`, `nanoid`, `nodemon` (dev)

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Running MongoDB instance (local or hosted, e.g. Atlas)

### Installation

```bash
git clone <this-repo-url>
cd url-shortener
npm install
```

### Environment Variables

Create a `.env` file in the project root. At minimum:

```env
PORT=5000              # Port for the Express server
MONGO_URI=...          # Your MongoDB connection string
BASE_URL=http://localhost:5000  # Base URL used to build short links
```

Adjust `PORT` and `BASE_URL` if you deploy or run on a different host/port.

### Running the App

- **Development** (if you add a `dev` script using `nodemon`):

```bash
npm run dev
```

- **Production / simple run**:

```bash
npm start
```

The server will start on `http://localhost:<PORT>` (default `http://localhost:5000` if you set `PORT=5000`).

### API Endpoints

Assume `BASE_URL=http://localhost:5000`.

- **Create short URL**
  - **URL**: `POST /api/url`
  - **Body (JSON)**:
    ```json
    {
      "originalUrl": "https://example.com/some/long/path",
      "customAlias": "my-link",          // optional
      "expiresAt": "2026-12-31T23:59:59Z" // optional ISO date
    }
    ```
  - **Response (201)**:
    ```json
    {
      "shortUrl": "http://localhost:5000/<shortCode-or-customAlias>"
    }
    ```

- **Redirect to original URL**
  - **URL**: `GET /:shortCode`
  - **Behavior**: Redirects to the stored `originalUrl` for `shortCode`.  
    Returns `404` JSON if not found or expired.

- **Get analytics**
  - **URL**: `GET /api/url/:shortCode/analytics`
  - **Response (200)**:
    ```json
    {
      "originalUrl": "https://example.com/some/long/path",
      "clicks": 12,
      "createdAt": "2026-02-25T10:00:00.000Z",
      "expiresAt": "2026-12-31T23:59:59.000Z"
    }
    ```

### Scripts (package.json)

- **`npm start`**: Runs `node server.js`.
- You can add a dev script such as:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Then run:

```bash
npm run dev
```

### Project Structure (high level)

```text
server.js            # App entrypoint (loads env, connects DB, starts server)
src/
  app.js             # Express app setup (routes, middleware) - assumed
  config/
    db.js            # MongoDB connection helper - assumed
  controllers/
    url.controller.js # Handlers for create, redirect, analytics
  services/
    url.service.js   # Business logic for creating/fetching URLs - assumed
  models/
    url.model.js     # Mongoose URL schema/model - assumed
```

### Notes

- Ensure your MongoDB URI is reachable from where the app runs.
- If you change `BASE_URL` or routing paths, update the docs and any client apps using this API.

