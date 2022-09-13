const router = require("express").Router();

const { ensureAuthenticated } = require("../auth/auth");
const {
  createTrip,
  getAllTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip-controllers");

router.post("/", ensureAuthenticated, createTrip);

router.get("/", ensureAuthenticated, getAllTrips);

router.get("/:id", ensureAuthenticated, getTrip);

router.patch("/:id", ensureAuthenticated, updateTrip);

router.delete("/:id", ensureAuthenticated, deleteTrip);

module.exports = router;
