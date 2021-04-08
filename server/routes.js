const express = require("express");

const router = express.Router();

const controllers = require("./controllers/index.js");

router.get(
  "/hotels/v2/shopping/hotel-offers",
  controllers.hotelOffers.getHotelOffers
);

module.exports = router;
