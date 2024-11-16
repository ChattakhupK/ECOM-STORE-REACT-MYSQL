// import
const express = require("express");
const router = express.Router();

//import controllers
const {
  create,
  list,
  read,
  update,
  remove,
  listby,
  searchFilters,
  createImages,
  removeImage,
  bannerData,
} = require("../controllers/products");

const { adminCheck, authCheck } = require("../middlewares/authCheck");

// @ENDPOINT http://localhost:5000/api/product
router.post("/product", create);
router.get("/products/:count", list);
router.get("/product/:id", read);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);

router.post("/search/filters", searchFilters);

router.post("/images", authCheck, adminCheck, createImages);
router.post("/removeimages", authCheck, adminCheck, removeImage);

router.get("/promotion", bannerData);

module.exports = router;
