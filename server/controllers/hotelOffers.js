const models = require('/Users/kanchanchauhan/Documents/sei/blueocean/HotelsAPI/server/models/index.js');

const getHotelOffers = (req, res) => {
  console.log(req.query)
  models.hotelOffers.getHotelOffers(req.query, (err, data) => {
    if(err){
      res.status(404);
    } else {
      res.send(data);
    }
  })
};

module.exports = { getHotelOffers }