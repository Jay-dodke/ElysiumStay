const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema} = require("../schema");

const validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if (error) {
    let messages = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, error.messages);
  } else {
    next();
  }
};
// ======================= INDEX ROUTE ===========================
router.get(
  "/",
  WrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
  })
);

// ======================= STATIC ROUTES =========================
router.get(
  "/coming-soon",
  WrapAsync(async (req, res) => {
    res.render("listings/comingSoon");
  })
);

router.get(
  "/privacy",
  WrapAsync(async (req, res) => {
    res.render("listings/privacy");
  })
);

router.get(
  "/terms",
  WrapAsync(async (req, res) => {
    res.render("listings/terms");
  })
);

// ======================= CAREER ROUTES =========================
router.get(
  "/careers",
  WrapAsync(async (req, res) => {
    res.render("listings/careers");
  })
);

router.post(
  "/careers",
  WrapAsync(async (req, res) => {
    const {name, email, role, message} = req.body;
    console.log("Resume Submitted:", {name, email, role, message});
    // Add email/DB logic later
    res.send("Thank you! We will get back to you soon.");
  })
);

// ======================= NEW LISTING FORM ======================
router.get(
  "/new",
  WrapAsync(async (req, res) => {
    res.render("listings/new");
  })
);

// ======================= CREATE ROUTE ==========================
router.post(
  "/",
  validateListing,
  WrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// ======================= SHOW ROUTE ============================
router.get(
  "/:id",
  WrapAsync(async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError("Listing Not Found", 404);
    res.render("listings/show", {listing});
  })
);

// ======================= EDIT ROUTE ============================
router.get(
  "/:id/edit",
  WrapAsync(async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError("Listing Not Found", 404);
    res.render("listings/edit", {listing});
  })
);

// ======================= UPDATE ROUTE ==========================
router.put(
  "/:id",
  WrapAsync(async (req, res) => {
    const {id} = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      req.body.listing,
      {new: true, runValidators: true}
    );
    if (!updatedListing) throw new ExpressError("Listing Not Found", 404);
    res.redirect(`/listings/${id}`);
  })
);

// ======================= DELETE ROUTE ==========================
router.delete(
  "/:id",
  WrapAsync(async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

module.exports = router;
