import express, { Router } from "express";
const router = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updatedProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/autMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, updatedProduct)
  .delete(protect, admin, deleteProduct);

export default router;
