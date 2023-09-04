import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:Pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get product
router.get("/get-product", getProductController);
export default router;

// single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:Pid", productPhotoController);

// delete product
router.delete("/delete-product/:Pid", deleteProductController);

// filter route
router.post("/product-filters", productFilterController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// similar product
router.get("/related-product/:Pid/:cid", relatedProductController);

// category wise product
router.get('/product-category/:slug',productCategoryController)
