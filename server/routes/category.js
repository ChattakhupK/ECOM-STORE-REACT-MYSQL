//import
const express = require("express");
const router = express.Router();

//import controllers
const { create, list, remove } = require("../controllers/category");
//import middlewares
const { authCheck, adminCheck } = require("../middlewares/authCheck");

// @ENDPOINT http://localhost:5000/api/category
router.post("/category", authCheck, adminCheck, create);
router.get("/category", list);
router.delete("/category/:id", authCheck, adminCheck, remove);

module.exports = router;
