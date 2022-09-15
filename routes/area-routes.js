const router = require("express").Router();

const { ensureAuthenticated } = require("../auth/auth");
const {
  getAllAreas,
  getArea,
  updateArea,
  deleteArea,
  createArea,
} = require("../controllers/area-controllers");

router.post("/", ensureAuthenticated, createArea);

router.get("/", ensureAuthenticated, getAllAreas);

router.get("/:id", ensureAuthenticated, getArea);

router.patch("/:id", ensureAuthenticated, updateArea);

router.delete("/:id", ensureAuthenticated, deleteArea);

module.exports = router;
