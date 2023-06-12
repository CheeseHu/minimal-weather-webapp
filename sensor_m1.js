const { Client } = require("pg");
const credentials = require("./credentials");

const insertSensor = async (
  timeStamp,
  temperature,
  luminosity,
  airHumidity,
  soilHumidity
) => {
  try {
    var client = new Client(credentials);
    await client.connect();
    await client.query(
      "INSERT INTO sensor (timestamp, temperature, luminosity, air_humidity, soil_humidity) values ($1,$2,$3,$4,$5)",
      [timeStamp, temperature, luminosity, airHumidity, soilHumidity]
    );
    await client.end();
    return true;
  } catch (err) {
    console.log(err);
    await client.end();
    return false;
  }
};
module.exports = { insertSensor };
