const router = require("express").Router();

const { ensureAuthenticated } = require("../auth/auth");
const {
  getAllDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destination-controllers");

router.post("/", ensureAuthenticated, createDestination);

router.get("/", ensureAuthenticated, getAllDestinations);

router.get("/:id", ensureAuthenticated, getDestination);

router.patch("/:id", ensureAuthenticated, updateDestination);

router.delete("/:id", ensureAuthenticated, deleteDestination);

module.exports = router;
