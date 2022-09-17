const Trip = require("../models/trip-model");

exports.getAllTrips = (req, res) => {
  const { status, constraint } = req.query;

  let options = {};

  if (status) {
    options.tripStatus = status;
  }
  if (constraint) {
    if (constraint === "day") {
      options.createdAt = { $gte: Date.now() - 60 * 60 * 24 * 1000 };
    }
    if (constraint === "week") {
      options.createdAt = { $gte: Date.now() - 7 * 60 * 60 * 24 * 1000 };
    }
    if (constraint === "month") {
      options.createdAt = { $gte: Date.now() - 30 * 60 * 60 * 24 * 1000 };
    }
  }
  if (req?.user?.userType === "driver") {
    options.driver = req.user._id;
  }

  Trip.find(options)
    .then((foundTrips) => {
      res.json({ success: true, trips: foundTrips });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
    });
};

exports.getTrip = (req, res) => {
  const { id } = req.params;

  Trip.findById(id)
    .then((foundTrips) => {
      res.json({ success: true, trips: foundTrips });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
    });
};

exports.createTrip = (req, res) => {
  const {
    day,
    month,
    year,
    hour,
    minutes,
    customerId,
    driver,
    pickupLocation,
    dropoffLocation,
    expectedPickupTime1,
    expectedPickupTime2,
    actualPickupTime1,
    actualPickupTime2,
    actualDropoffTime1,
    actualDropoffTime2,
    expectedDropoffTime1,
    expectedDropoffTime2,
    tripStatus,
    notes,
  } = req.body;

  Trip.create({
    day,
    month,
    year,
    hour,
    minutes,
    customerId,
    driver,
    pickupLocation,
    dropoffLocation,
    expectedPickupTime1,
    expectedPickupTime2,
    actualPickupTime1,
    actualPickupTime2,
    actualDropoffTime1,
    actualDropoffTime2,
    expectedDropoffTime1,
    expectedDropoffTime2,
    tripStatus,
    notes,
  })
    .then((createdTrip) => {
      if (!createdTrip) {
        return res
          .status(500)
          .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
      }

      res.json({ success: true, trip: createdTrip });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
    });
};

exports.updateTrip = (req, res) => {
  const { id } = req.params;
  const {
    day,
    month,
    year,
    hour,
    minutes,
    customerId,
    driver,
    pickupLocation,
    dropoffLocation,
    expectedPickupTime1,
    expectedPickupTime2,
    actualPickupTime1,
    actualPickupTime2,
    actualDropoffTime1,
    actualDropoffTime2,
    expectedDropoffTime1,
    expectedDropoffTime2,
    tripStatus,
    notes,
  } = req.body;

  Trip.findById(id)
    .then((foundTrip) => {
      if (!foundTrip) {
        return res
          .status(404)
          .json({ success: false, errors: ["Trip not found!"] });
      }

      foundTrip.day = day;
      foundTrip.month = month;
      foundTrip.year = year;
      foundTrip.hour = hour;
      foundTrip.minutes = minutes;
      foundTrip.customerId = customerId;
      foundTrip.driver = driver;
      foundTrip.pickupLocation = pickupLocation;
      foundTrip.dropoffLocation = dropoffLocation;
      foundTrip.expectedPickupTime1 = expectedPickupTime1;
      foundTrip.expectedPickupTime2 = expectedPickupTime2;
      foundTrip.actualPickupTime1 = actualPickupTime1;
      foundTrip.actualPickupTime2 = actualPickupTime2;
      foundTrip.actualDropoffTime1 = actualDropoffTime1;
      foundTrip.actualDropoffTime2 = actualDropoffTime2;
      foundTrip.expectedDropoffTime1 = expectedDropoffTime1;
      foundTrip.expectedDropoffTime2 = expectedDropoffTime2;
      foundTrip.tripStatus = tripStatus;
      foundTrip.notes = notes;

      foundTrip
        .save()
        .then((savedTrip) => {
          res.json({
            success: true,
            msg: "Trip updated successfully",
            trip: savedTrip,
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
    });
};

exports.deleteTrip = (req, res) => {
  const { id } = req.params;

  Trip.findById(id)
    .then((foundTrip) => {
      if (!foundTrip) {
        return res
          .status(404)
          .json({ success: false, errors: ["Trip not found"] });
      }

      foundTrip
        .remove()
        .then(() => {
          res.json({ success: true, msg: "Trip deleted successfully" });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, errors: ["Uh Oh! Something went wrong."] });
    });
};
