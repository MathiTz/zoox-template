const express = require("express");
const router = express.Router();

const stateController = require("../controllers/state-controller");

router.get("/", stateController.getStates);
router.get("/:abbr", stateController.getState);
router.get("/:abbr/cities", stateController.getAllCitiesWithinState);
router.post("/", stateController.createState);
router.put("/:abbr", stateController.updateState);
router.delete("/:abbr", stateController.deleteState);

module.exports = router;
