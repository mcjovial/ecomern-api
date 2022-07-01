const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

// controller
const {
  productsCount,
  productStar,
  searchFilters,
  createProduct,
  listAllProducts,
  removeProduct,
  updateProduct,
  readProduct,
  listWithPagination,
  listRelatedProducts,
} = require("../controllers/product.controller");

// routes
router.post("/product", authCheck, adminCheck, createProduct);
router.get("/products/total", productsCount);

router.get("/products/:count", listAllProducts); // products/100
router.delete("/product/:slug", authCheck, adminCheck, removeProduct);
router.get("/product/:slug", readProduct);
router.put("/product/:slug", authCheck, adminCheck, updateProduct);

router.post("/products", listWithPagination);
// rating
router.put("/product/star/:productId", authCheck, productStar);
// related
router.get("/product/related/:productId", listRelatedProducts);
// search
router.post("/search/filters", searchFilters);

module.exports = router;