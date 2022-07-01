const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

// controller
const {
  getSubs,
  removeCategory,
  updateCategory,
  readCategory,
  listCategories,
  createCategory,
} = require("../controllers/category.controller");

// routes
router.post("/category", authCheck, adminCheck, createCategory);
router.get("/categories", listCategories);
router.get("/category/:slug", readCategory);
router.put("/category/:slug", authCheck, adminCheck, updateCategory);
router.delete("/category/:slug", authCheck, adminCheck, removeCategory);
router.get("/category/subs/:_id", getSubs);

module.exports = router;