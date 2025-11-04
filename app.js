// Express and required packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoutes = require("./routes/listings");
const ExpressError = require("./utils/ExpressError");
const app = express();

// Database setup
const MONGO_URL = "mongodb://127.0.0.1:27017/elysiumstay";

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// EJS setup
app.engine("ejs", ejsMate); // For layout support
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); // To read form data
app.use(methodOverride("_method")); // For PUT & DELETE via POST
app.use(express.static(path.join(__dirname, "public"))); // For static files

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings"); // Home -> redirect to listings
});

app.use("/listings", listingsRoutes); 

// 404 handler (runs when no route matches)
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const {statusCode = 500} = err;
  if (!err.message) err.message = "Something went wrong!";
  // res.status(statusCode).send(err.message);
  res.render("listings/error", {err, statusCode});
});

// Start server
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
