const { Client } = require("pg");
const credentials = require("./credentials");

var returnData = {};
const retrieveDashBoard = async () => {
  try {
    var client = new Client(credentials);

    await client.connect();
    const res = await client.query(
      "SELECT AVG(temperature) as AVG_temperature, AVG(luminosity) as AVG_luminosity,AVG(air_humidity) as AVG_air_humidity, AVG(soil_humidity) as AVG_soil_humidity FROM sensor"
    );
    returnData = res.rows[0];
    await client.end();
    return returnData;
  } catch (err) {
    console.log(err);
  }
};


module.exports = { retrieveDashBoard };
