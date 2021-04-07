const models = require("../models/index.js");

const getHotelOffers = (req, res) => {
  models.hotelOffers.getHotelOffers(req.query, (err, hotelsData) => {
    if (err) {
      res.status(404);
    } else {
      res.send(hotelsData);
    }
  });
};

module.exports = { getHotelOffers };
