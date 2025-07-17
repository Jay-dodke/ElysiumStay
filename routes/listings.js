const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

// ======================= INDEX ROUTE ===========================
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", {allListings});
});

// ================================ Coming soon =================================

router.get("/coming-soon", (req, res) => {
  res.render("listings/comingSoon");
});

// ======================= PRIVACY ROUTE ==========================
router.get("/privacy", (req, res) => {
  res.render("listings/privacy");
});

// ======================= Term & Conditions ROUTE ==========================
router.get("/terms", (req, res) => {
  res.render("listings/terms");
});

// =================== Career Page GET Route ===================
router.get("/careers", (req, res) => {
  res.render("listings/careers");
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

// =================== Resume POST Submit Route ===================
router.post("/careers", (req, res) => {
  const {name, email, role, message} = req.body;
  console.log("Resume Submitted:", {name, email, role, message});
  // TODO: Save to DB or send via mail
  res.send("Thank you! We will get back to you soon.");
});

module.exports = router;
