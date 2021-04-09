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
    /*
    const currencies = await axios.get("http://data.fixer.io/api/latest", {
      params: {
        access_key: fixer.token,
      },
    });

    const { currency } = hotelsData.result.data[0].offers[0].price;
    const USDtoEUR = currencies.data.rates.USD;
    const foreignCurrToEUR = currencies.data.rates[currency];
    const exchangeRate = USDtoEUR / foreignCurrToEUR;

    */
    /* unsplash api call */
    const hotels = [];
    const { cityName } = hotelsData.result.data[0].hotel.address;
    // const query = `${cityName} hotel`;
    const query = "LONDON";
    const { data: response } = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKeys.access_key}`
    );

    const images = response.results;
    console.log(images);
    let counter = 0;
    for (const hotelObj of hotelsData.result.data) {
      const hotel = {};
      hotel.id = hotelObj.hotel.hotelId;
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
      hotel.price = Number(
        (
          (hotelPrice.total * currency.USD) /
          currency[hotelPrice.currency]
        ).toFixed(2)
      );
      images[counter]
        ? (hotel.image = images[counter].urls.small)
        : (hotel.image = images[0].urls.small);
      hotels.push(hotel);
      counter += 1;
    }
    callback(null, hotels);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
};

module.exports = { getHotelOffers };

const currency = {
  EUR: 1.0,
  AED: 4.361205,
  AFN: 93.098691,
  ALL: 123.789683,
  AMD: 635.371018,
  ANG: 2.131475,
  AOA: 748.016417,
  ARS: 109.571383,
  AUD: 1.549276,
  AWG: 2.137258,
  AZN: 2.017182,
  BAM: 1.966788,
  BBD: 2.397558,
  BDT: 100.693706,
  BGN: 1.957021,
  BHD: 0.447288,
  BIF: 2312.363119,
  BMD: 1.187365,
  BND: 1.592975,
  BOB: 8.199181,
  BRL: 6.641651,
  BSD: 1.187416,
  BTC: 2.0465066e-5,
  BTN: 87.210485,
  BWP: 12.998721,
  BYN: 3.153369,
  BYR: 23272.359816,
  BZD: 2.393535,
  CAD: 1.493058,
  CDF: 2372.355937,
  CHF: 1.10508,
  CLF: 0.030892,
  CLP: 852.414233,
  CNY: 7.764783,
  COP: 4317.853902,
  CRC: 728.368036,
  CUC: 1.187365,
  CUP: 31.46518,
  CVE: 110.882773,
  CZK: 26.024439,
  DJF: 211.018376,
  DKK: 7.436712,
  DOP: 67.540295,
  DZD: 157.561389,
  EGP: 18.646811,
  ERN: 17.810168,
  ETB: 49.201924,
  EUR: 1,
  FJD: 2.436652,
  FKP: 0.858826,
  GBP: 0.85888,
  GEL: 4.066755,
  GGP: 0.858826,
  GHS: 6.863338,
  GIP: 0.858826,
  GMD: 60.852683,
  GNF: 11868.323274,
  GTQ: 9.158023,
  GYD: 249.218498,
  HKD: 9.233606,
  HNL: 28.555092,
  HRK: 7.571942,
  HTG: 96.313602,
  HUF: 360.875712,
  IDR: 17177.969958,
  ILS: 3.913758,
  IMP: 0.858826,
  INR: 87.256685,
  IQD: 1732.452198,
  IRR: 49994.015418,
  ISK: 149.928772,
  JEP: 0.858826,
  JMD: 172.924433,
  JOD: 0.841839,
  JPY: 130.315697,
  KES: 128.959638,
  KGS: 100.673019,
  KHR: 4803.160367,
  KMF: 497.258009,
  KPW: 1068.583702,
  KRW: 1327.86616,
  KWD: 0.358573,
  KYD: 0.989513,
  KZT: 510.182435,
  LAK: 11164.200317,
  LBP: 1795.402923,
  LKR: 237.485127,
  LRD: 205.413991,
  LSL: 17.406512,
  LTL: 3.505981,
  LVL: 0.718225,
  LYD: 5.383896,
  MAD: 10.736719,
  MDL: 21.373682,
  MGA: 4522.908972,
  MKD: 61.966241,
  MMK: 1674.270344,
  MNT: 3395.907881,
  MOP: 9.511694,
  MRO: 423.889207,
  MUR: 47.970212,
  MVR: 18.356852,
  MWK: 931.060317,
  MXN: 23.95889,
  MYR: 4.9056,
  MZN: 78.597617,
  NAD: 17.407044,
  NGN: 486.820006,
  NIO: 41.440884,
  NOK: 10.084038,
  NPR: 139.536414,
  NZD: 1.682533,
  OMR: 0.457153,
  PAB: 1.187416,
  PEN: 4.383522,
  PGK: 4.222727,
  PHP: 57.931107,
  PKR: 181.88395,
  PLN: 4.59172,
  PYG: 7588.880752,
  QAR: 4.3229,
  RON: 4.91356,
  RSD: 118.263896,
  RUB: 91.633962,
  RWF: 1181.090336,
  SAR: 4.453183,
  SBD: 9.4839,
  SCR: 22.893295,
  SDG: 451.793148,
  SEK: 10.232471,
  SGD: 1.590001,
  SHP: 0.858826,
  SLL: 12125.970871,
  SOS: 695.795987,
  SRD: 16.806014,
  STD: 24464.598355,
  SVC: 10.389886,
  SYP: 1493.307981,
  SZL: 17.268711,
  THB: 37.154446,
  TJS: 13.539031,
  TMT: 4.167652,
  TND: 3.319284,
  TOP: 2.711883,
  TRY: 9.677021,
  TTD: 8.066441,
  TWD: 33.776151,
  TZS: 2753.500476,
  UAH: 33.016649,
  UGX: 4342.393245,
  USD: 1.187365,
  UYU: 52.490446,
  UZS: 12435.322256,
  VEF: 245405586644.9416,
  VND: 27416.858385,
  VUV: 130.091705,
  WST: 3.006753,
  XAF: 659.63208,
  XAG: 0.047232,
  XAU: 0.000681,
  XCD: 3.208915,
  XDR: 0.837164,
  XOF: 659.63208,
  XPF: 120.962887,
  YER: 297.256615,
  ZAR: 17.240307,
  ZMK: 10687.714031,
  ZMW: 26.251558,
  ZWL: 382.332019,
};
