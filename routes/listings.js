const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

// ======================= INDEX ROUTE ===========================
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", {allListings});
});

// ======================= NEW ROUTE =============================
router.get("/new", (req, res) => {
  res.render("listings/new");
});

// ======================= CREATE ROUTE ==========================
router.post("/", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// ======================= SHOW ROUTE ============================
router.get("/:id", async (req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", {listing});
});

// ======================= EDIT ROUTE ============================
router.get("/:id/edit", async (req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", {listing});
});

// ======================= UPDATE ROUTE ==========================
router.put("/:id", async (req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect(`/listings/${id}`);
});

// ======================= DELETE ROUTE ==========================
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
module.exports = router;
