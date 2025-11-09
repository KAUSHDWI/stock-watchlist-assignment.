require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const validator = require("validator"); // Used for validation logic

const app = express();

// --- Security Middleware ---
// ✅ FIX: Prevents crash on Express 5 (adds replaceWith option)
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Set security headers
app.use(helmet());

// Prevent HTTP Parameter Pollution attacks
app.use(hpp());

// --- Body Parser ---
app.use(express.json()); // Allows us to get data from req.body

// --- Connect to MongoDB ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};
connectDB();

// --- Stock Model ---
const Stock = require("./models/Stock");

// --- Routes ---

// @route   GET /api/stocks
// @desc    Get all stock names
// @access  Public
app.get("/api/stocks", async (req, res, next) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, count: stocks.length, data: stocks });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/stocks
// @desc    Add a stock name
// @access  Public
app.post("/api/stocks", async (req, res, next) => {
  try {
    const { name } = req.body;

    // --- Input Validation ---
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Stock name is required" });
    }

    // Validate stock name (1–5 uppercase letters only)
    const isValidStockName =
      validator.isAlphanumeric(name) &&
      validator.isUppercase(name) &&
      name.length >= 1 &&
      name.length <= 5;

    if (!isValidStockName) {
      return res.status(400).json({
        success: false,
        error:
          "Stock name must be 1–5 uppercase letters only (e.g., APPLE, GOOG, TCS)",
      });
    }

    // Check if stock already exists
    const existingStock = await Stock.findOne({ name });
    if (existingStock) {
      return res.status(409).json({
        success: false,
        error: `Stock '${name}' already exists in watchlist`,
      });
    }

    // Create new stock
    const stock = await Stock.create({ name });
    res.status(201).json({ success: true, data: stock });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error:
          "Duplicate stock name. This stock is already in your watchlist.",
      });
    }

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ success: false, error: messages.join(", ") });
    }

    next(err);
  }
});

// --- Generic Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error("💥 Error details:", err.message);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "Something went wrong on the server.",
  });
});

// --- Server Listen ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("📡 API Endpoints:");
  console.log("- GET /api/stocks (View all stocks)");
  console.log('- POST /api/stocks (Add a stock, send { "name": "XYZ" } in body)');
});
