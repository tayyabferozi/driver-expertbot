const Area = require("../models/area-model");

exports.getAllAreas = (req, res) => {
  Area.find()
    .then((foundAreas) => {
      res.json({ success: true, areas: foundAreas });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.getArea = (req, res) => {
  const { id } = req.params;

  Area.findById(id)
    .then((foundArea) => {
      if (!foundArea) {
        return res
          .status(404)
          .json({ success: false, errors: ["Area not found"] });
      }

      res.json({ success: true, area: foundArea });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.createArea = (req, res) => {
  const { name, zipcodes } = req.body;

  Area.create({
    name,
    zipcodes,
  })
    .then((createdArea) => {
      res.json({ success: true, area: createdArea });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.updateArea = (req, res) => {
  const { id } = req.params;
  const { name, zipcodes } = req.body;

  Area.findById(id)
    .then((foundArea) => {
      if (!foundArea) {
        return res
          .status(404)
          .json({ success: false, errors: ["Area not found"] });
      }

      foundArea.name = name;
      foundArea.zipcodes = zipcodes;

      foundArea
        .save()
        .then((savedArea) => {
          res.json({
            success: true,
            msg: "Area updated successfully",
            area: savedArea,
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.deleteArea = (req, res) => {
  const { id } = req.params;

  Area.findById(id)
    .then((foundArea) => {
      if (!foundArea) {
        return res
          .status(404)
          .json({ success: false, errors: ["Area not found"] });
      }

      foundArea
        .remove()
        .then(() => {
          res.json({ success: true, msg: "Area deleted successfully" });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};
