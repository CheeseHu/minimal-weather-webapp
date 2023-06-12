const { Client } = require("pg");
const credentials = require("./credentials");
const thresholder = require("./thresholder_m2");

var recieveData;
var DRYER_STATE = 0;
var AC_MODE = null; //cooler, heater, null
var LIGHT_STATE = 0;

const fetchLatestUpdate = async () => {
  try {
    console.log("The latest data: ");
    var client = new Client(credentials);
    await client.connect();
    const res = await client.query(
      "SELECT * FROM sensor ORDER BY TIMESTAMP DESC LIMIT 1"
    );
    console.log(res.rows[0]);
    recieveData = res.rows[0];
    controller();

    await client.end();
  } catch (err) {
    console.log(err);
  }
};

const controller = () => {
  try {
    if (recieveData.luminosity < thresholder.LUMINOSITY_MIN) {
      LIGHT_STATE = 1;
    } else {
      LIGHT_STATE = 0;
    }

    if (
      recieveData.air_humidity > thresholder.HUMID_MAX ||
      recieveData.soil_humidity > thresholder.HUMID_MAX
    ) {
      DRYER_STATE = 1;
    }
    if (recieveData.temperature > thresholder.TEMP_MAX) {
      AC_MODE = "cooler";
    }
    if (recieveData.temperature < thresholder.TEMP_MIN) {
      AC_MODE = "heater";
    }
    console.log({
      LIGHT_STATE: LIGHT_STATE,
      DRYER_STATE: DRYER_STATE,
      AC_MODE: AC_MODE,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { fetchLatestUpdate };
