const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { getAddress, updateAddress } = require("../controllers/userAddressController");

router.get("/address", auth, getAddress);
router.put("/address", auth, updateAddress);

module.exports = router;