import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const port = 4000;
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const [time, setTime] = useState("");
  const [APM, setAPM] = useState("");
  const [icon, setIcon] = useState("");
  useEffect(() => {
    var timeNow = new Date();
    timeNow.getHours() > 12 ? setAPM("PM") : setAPM("AM");
    timeNow.getHours() > 17 ? setIcon("/night.png") : setIcon("/day.png");
    setTime(
      `${
        timeNow.getHours() % 12 < 10
          ? "0" + (timeNow.getHours() % 12)
          : timeNow.getHours() % 12
      }:${
        timeNow.getMinutes() < 10
          ? "0" + timeNow.getMinutes()
          : timeNow.getMinutes()
      }`
    );
  }, [count]);
  //time counter
  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  // fetching data
  useEffect(() => {
    axios.get(`http://localhost:${port}/data`).then((res) => {
      setData(res.data);
    });
  }, [count]);
  return (
    <div className="App">
      <img id="sheep" src="/sheep.jpg" />
      <div className="container">
        <div className="header">
          <div className="time-container">
            <div className="time">{time}</div>
            <div className="am_pm">{APM}</div>
          </div>
          <div className="city">{"Ho Chi Minh city"}</div>
        </div>
        <div className="body">
          <div className="item-temp">
            <img src={icon} />
            {`${Math.round(Object.values(data)[0])}°`}
          </div>
          <div className="item-humid">
            <img src="/air_humid.png" />
            {`${Math.round(Object.values(data)[1])}%`}
          </div>
          <div className="item-humid">
            <img src="/soil_humid.png" />
            {`${Math.round(Object.values(data)[2])}%`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
