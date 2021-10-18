import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/react";
import "./App.scss";
import WeatherComponent from "./components/weather-component/WeatherComponent";

const App = () => {
  const API_KEY = "f374781e945c2515b3a1546bd4763670";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${API_KEY}&cnt=40`;
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const override = css`
    margin: 0 auto;
    border-color: white;
  `;

  const filterItems = (arr, query) => {
    return arr.filter(
      (elm) => elm.dt_txt.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  const getData = (data) => {
    let temp = 0;
    let time = [];
    let cTempArr = [];
    let fTempArr = [];
    let length = data.length;
    for (let i = 0; i < length; i++) {
      time.push(data[i].dt_txt.slice(11));
      cTempArr.push((data[i].main.temp - 273).toFixed(2));
      fTempArr.push((((data[i].main.temp - 273)*9/5)+32).toFixed(2));
      temp = temp + (data[i].main.temp - 273);
    }
    return {
      time: time,
      cTempArr: cTempArr,
      fTempArr: fTempArr,
      temp: (temp / length).toFixed(2),
      icon: data[0].weather[0].icon,
      desc: data[0].weather[0].description,
    };
  };

  useEffect(() => {
    const forcastData = [];

    const dateArray = [];
    for (let i = 0; i < 5; i++) {
      const today = new Date();
      today.setDate(today.getDate() + i);
      dateArray.push(today.toISOString().slice(0, 10));
    }

    const getWeatherdata = async () => {
      await axios(url).then((response) => {
        // console.log(response);
        setLoading(false);
        dateArray.forEach((date) => {
          var weatherListData = getData(filterItems(response.data.list, date));
          weatherListData = { ...weatherListData, date: date };
          forcastData.push(weatherListData);
        });
        setWeatherData(forcastData);
      });
    };
    getWeatherdata();
  }, [url]);

  // console.log(weatherData);

  return (
    <div className="app-container">
      {loading === true ? (
        <div className='app-loader'>
          <CircleLoader color='white' css={override} size={100} />
        </div>
      ) : (
        <WeatherComponent weatherData={weatherData}></WeatherComponent>
      )}
    </div>
  );
}

export default App;
