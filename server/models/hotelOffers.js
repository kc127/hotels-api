//var amadeus = require('./amadeus.js');

var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: 'qo02oOj99hJDCmBYFvnT2OF5kcpxzSu2',
  clientSecret: 'YjZSzNSiMMtwr0Qp',
  logLevel: 'debug'
});

// Book a hotel in LON for 2020-10-10 to 2020-10-12
var getHotelOffers = (cityCode, callback) => {
  amadeus.shopping.hotelOffers.get(cityCode).then((response) => {

    console.log("here", response);
    callback(response.result);
  }).catch((response) => {
    console.log(response);
    callback(response);
  })
}

module.exports = { getHotelOffers }