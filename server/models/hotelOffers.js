/* eslint-disable no-restricted-syntax */
const axios = require("axios");
const amadeus = require("./aamadeus.js");
const fixer = require("./fixer.js");
const unsplashKeys = require("./unsplash.js");

const getHotelOffers = async (cityCode, callback) => {
  try {
    /* amadeus api call */
    const hotelsData = await amadeus.shopping.hotelOffers.get(cityCode);

    /* fixer.io api call */
    const currencies = await axios.get("http://data.fixer.io/api/latest", {
      params: {
        access_key: fixer.token,
      },
    });

    const { currency } = hotelsData.result.data[0].offers[0].price;
    const USDtoEUR = currencies.data.rates.USD;
    const foreignCurrToEUR = currencies.data.rates[currency];
    const exchangeRate = USDtoEUR / foreignCurrToEUR;
    const hotels = [];

    /* unsplash api call */
    const { cityName } = hotelsData.result.data[0].hotel.address;
    const query = `${cityName} hotel`;
    const { data: response } = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKeys.access_key}`
    );

    const images = response.results;
    let counter = 0;
    for (const hotelObj of hotelsData.result.data) {
      const hotel = {};
      hotel.type = hotelObj.hotel.type;
      hotel.name = hotelObj.hotel.name;
      const hotelDescription = hotelObj.hotel.description;
      hotel.description = hotelDescription ? hotelDescription.text : null;
      const hotelOffers = hotelObj.offers[0];
      const hotelRoom = hotelOffers.room;
      const hotelGuests = hotelOffers.guests;
      const hotelPrice = hotelOffers.price;
      hotel.checkInDate = hotelOffers.checkInDate;
      hotel.checkOutDate = hotelOffers.checkOutDate;
      hotel.roomDescription = hotelRoom ? hotelRoom.description.text : null;
      hotel.guests = hotelGuests ? hotelGuests.adults : null;
      hotel.price = Number((hotelPrice.total * exchangeRate).toFixed(2));
      hotel.image = images[counter].urls.small;
      hotels.push(hotel);
      counter += 1;
    }
    callback(null, hotels);
  } catch (error) {
    callback(error, null);
  }
};

module.exports = { getHotelOffers };
