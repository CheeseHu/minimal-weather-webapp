const mqtt = require("mqtt");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4000;

const m1 = require("./sensor_m1");
const m3 = require("./processor_m3");
const m4 = require("./dashboard_m4");
const client = mqtt.connect("mqtt://broker.hivemq.com");
var timeStamp;
var temperature;
var luminosity;
var airHumidity;
var soilHumidity;

app.use(bodyParser.json());
app.use(cors());
var fetchedData;

app.get("/data", (req, res) => {
  res.json(fetchedData);
});

client.on("connect", function () {
  client.subscribe("sensor_publisher_17523");
});
client.on("message", function (topic, message) {
  if (message) {
    console.log("fetching data...");
    timeStamp = JSON.parse(message).timeStamp;
    temperature = JSON.parse(message).temperature;
    luminosity = JSON.parse(message).luminosity;
    airHumidity = JSON.parse(message).airHumidity;
    soilHumidity = JSON.parse(message).soilHumidity;

    m1.insertSensor(
      timeStamp,
      temperature,
      luminosity,
      airHumidity,
      soilHumidity
    )
      ? console.log("pass")
      : console.log("fail");
    m3.fetchLatestUpdate();
    m4.retrieveDashBoard().then((value) => {
      console.log(value);
      fetchedData = value;
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
