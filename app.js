// Express and required packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Import listings routes from routes folder
const listingsRoutes = require("./routes/listings");

const app = express();

// Database setup
const MONGO_URL = "mongodb://127.0.0.1:27017/elysiumstay";

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Failed:", err);
  });

// EJS setup
app.engine("ejs", ejsMate); // For layout support
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({extended: true})); // To read form data
app.use(methodOverride("_method")); // PUT & DELETE via POST
app.use(express.static(path.join(__dirname, "public"))); // CSS, JS, IMG !!!

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings"); // Home -> redirect to listings
});

app.use("/listings", listingsRoutes); // All listings routes handled separately

const listingsRouter = require("./routes/listings");
app.use("/listings", listingsRouter);

// page not found
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start server
app.listen(8080, () => {
  console.log("Server running at 8080");
});
