# Stock Watchlist Application

This is a simple web application built with Node.js, Express.js, and MongoDB where users can add and view their favorite stock names.

## Features

*   **Add Stock:** Users can add a new stock name to their watchlist.
*   **View Watchlist:** Users can view all stock names currently in their watchlist.

## Technical Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Security:** `express-mongo-sanitize`, `helmet`, `hpp`
*   **Input Validation:** `validator` library

## Security Measures Implemented

*   **Stock Name Validation:** Stock names are strictly validated to be 1-5 uppercase letters only.
*   **MongoDB Injection Prevention:** Using `express-mongo-sanitize` to remove any `$`, `.`, or `_` characters from user-supplied data in `req.body`, `req.query`, and `req.params`.
*   **Cross-Site Scripting (XSS) Protection:** `helmet` helps set various HTTP headers to prevent XSS and other attacks.
*   **HTTP Parameter Pollution (HPP) Protection:** `hpp` protects against parameter pollution attacks by ensuring `req.query` and `req.body` only contain single values for each parameter.
*   **Error Handling:** Robust error handling is implemented to catch Mongoose validation errors, duplicate key errors, and general server errors, providing appropriate responses without exposing sensitive details.

## How to Run Locally

### Prerequisites

*   Node.js (LTS recommended)
*   npm (comes with Node.js)
*   MongoDB Atlas account (free tier is sufficient)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KAUSHDWI/stock-watchlist-assignment..git
    cd stock-watchlist-assignment
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` file:**
    In the root directory of the project, create a file named `.env`.
4.  **Configure `.env`:**
    Add your MongoDB Atlas connection string and desired port:
    ```env
    MONGO_URI=mongodb+srv://watchlistuser:Kaush212005@cluster0.pyp1u9e.mongodb.net/stockDB?retryWrites=true&w=majority
    PORT=3000
    ```
    **Important:** Replace `YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE` with your actual MongoDB Atlas URI. Ensure your MongoDB user has read/write access and network access is configured to allow connections. This exact string should also be added as an environment variable in Render.com.
5.  **Start the server:**
    ```bash
    npm run dev
    ```
    (The server will run on `http://localhost:3000`)
6.  **Access the API:**
    *   **View Watchlist (GET):** `http://localhost:3000/api/stocks` (Can use browser)
    *   **Add Stock (POST):** `http://localhost:3000/api/stocks` (Requires Postman/Insomnia/cURL)
        *   Body (raw JSON): `{ "name": "YOURSTOCK" }`
        *   Example: `{ "name": "AAPL" }`

7. ** API Endpoints **
Method	Endpoint	Description	Example Body
GET	/api/stocks	Fetch all stocks in the database	—
POST	/api/stocks	Add a new stock to the list	{ "name": "AAPL" }
🧪 Example Request (POST)
POST https://stock-watchlist-api.onrender.com/api/stocks
Content-Type: application/json

Request Body
{ "name": "GOOG" }

Example Response
{
  "success": true,
  "count": 3,
  "data": [
    { "_id": "64a03d...", "name": "AAPL", "createdAt": "2025-11-09T06:10:13.164Z" },
    { "_id": "64a03e...", "name": "GOOG", "createdAt": "2025-11-09T06:15:42.784Z" },
    { "_id": "64a03f...", "name": "TCS", "createdAt": "2025-11-09T06:20:55.297Z" }
  ]
}

8 . 🌐 Live Deployment (Render)

Your backend API is deployed and live on Render 🎉

Base URL:
👉 https://stock-watchlist-api.onrender.com/api/stocks

Available Endpoints:

GET /api/stocks → View all stocks

POST /api/stocks → Add a new stock

⚠️ Note: On Render’s Free Plan, the instance sleeps after inactivity.
The first request may take 30–50 seconds to wake up.

## Live Website URL

https://stock-watchlist-api.onrender.com/api/stocks

## GitHub Repository

https://github.com/KAUSHDWI/stock-watchlist-assignment..git

---