import express from "express";
import { admin } from "../middleware/autMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderContoller.js";
const router = express.Router();

router.route("/").post(addOrderItems).get(admin, getOrders);
router.route("/mine").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(admin, updateOrderToDelivered);

export default router;
