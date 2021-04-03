const express = require('express');
const router = express.Router();

const controllers = require('/Users/kanchanchauhan/Documents/sei/blueocean/HotelsAPI/server/controllers/index.js');


router.get('/v2/shopping/hotel-offers', controllers.hotelOffers.getHotelOffers)


module.exports = router;