//import
const express = require("express");
const router = express.Router();

//import middlewares
const { authCheck } = require("../middlewares/authCheck");
//import controller
const { payment } = require("../controllers/stripe");

// @ENDPOINT http://localhost:5000/api/
router.post("/user/create-payment-intent", authCheck, payment);

module.exports = router;
