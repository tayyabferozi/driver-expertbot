const Destination = require("../models/destination-model");

exports.getAllDestinations = (req, res) => {
  Destination.find()
    .then((foundDestinations) => {
      res.json({ success: true, destinations: foundDestinations });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.getDestination = (req, res) => {
  const { id } = req.params;

  Destination.findById(id)
    .then((foundDestination) => {
      if (!foundDestination) {
        return res
          .status(404)
          .json({ success: false, errors: ["Destination not found"] });
      }

      res.json({ success: true, destination: foundDestination });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.createDestination = (req, res) => {
  const { name, address1, address2, city, state, zipcode, country, phone } =
    req.body;

  Destination.create({
    name,
    address1,
    address2,
    city,
    state,
    zipcode,
    country,
    phone,
  })
    .then((createdDestination) => {
      res.json({ success: true, destination: createdDestination });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong"] });
    });
};

exports.updateDestination = (req, res) => {
  const { id } = req.params;
  const { name, address1, address2, city, state, zipcode, country, phone } =
    req.body;

  Destination.findById(id)
    .then((foundDestination) => {
      if (!foundDestination) {
        return res
          .status(404)
          .json({ success: false, errors: ["Destination not found"] });
      }

      foundDestination.name = name;
      foundDestination.address1 = address1;
      foundDestination.address2 = address2;
      foundDestination.city = city;
      foundDestination.state = state;
      foundDestination.zipcode = zipcode;
      foundDestination.country = country;
      foundDestination.phone = phone;

      foundDestination
        .save()
        .then((savedDestination) => {
          res.json({
            success: true,
            msg: "Destination updated successfully",
            destination: savedDestination,
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

exports.deleteDestination = (req, res) => {
  const { id } = req.params;

  Destination.findById(id)
    .then((foundDestination) => {
      if (!foundDestination) {
        return res
          .status(404)
          .json({ success: false, errors: ["Destination not found"] });
      }

      foundDestination
        .remove()
        .then(() => {
          res.json({ success: true, msg: "Destination deleted successfully" });
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
