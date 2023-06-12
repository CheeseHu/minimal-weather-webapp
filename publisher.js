const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");

console.log("publisher is running!");
client.on("connect", function () {
  setInterval(function () {
    const timeStamp = new Date();
    const temperature = Math.floor(Math.random() * 40) + 22; //22-40
    const luminosity = Math.floor(Math.random() * 50); //0-50
    const airHumidity = Math.floor(Math.random() * 70) + 50; //50-70
    const soilHumidity = Math.floor(Math.random() * 90) + 40; //40 -90
    const sendData = {
      timeStamp,
      temperature,
      luminosity,
      airHumidity,
      soilHumidity,
    };
    client.publish("sensor_publisher_17523", JSON.stringify(sendData));
  }, 5000);
});
