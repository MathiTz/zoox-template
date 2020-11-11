const express = require("express");
const router = express.Router();

const cityController = require("../controllers/city-controller");

router.get("/", cityController.getCities);
router.get("/:name", cityController.getCity);
router.post("/", cityController.createCity);
router.put("/:name", cityController.updateCity);
router.delete("/:name", cityController.deleteCity);

module.exports = router;
