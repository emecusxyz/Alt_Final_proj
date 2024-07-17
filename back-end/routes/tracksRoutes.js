const express = require("express");
const router = express.Router();
const HealthController = require("../controller/HealthController");

router.route("/").get(HealthController.getAllTracks).post().patch().put();
router
  .route("/:date")
  .get(HealthController.getAllTracksByDate)
  .put(HealthController.putATrack);
module.exports = router;
