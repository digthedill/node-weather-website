const request = require("postman-request");

const geocode = (address, callback) => {
  //special characters is caught with encodeURIComponent  (? becomes %3F)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGlndGhlZGlsbCIsImEiOiJja2ZuamZkMmIxZWp2MzhxdXA0bnZ0NTN6In0.5JMk0volRI3wqCI6c7L6sA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length < 1) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
