import React from "react";
import Slider from "react-slick";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import "./weathercomponent.scss";
import WeatherChart from "../weather-chart/WeatherChart";
import WeatherCard from "../weather-card/WeatherCard";

const WeatherComponent = ({ weatherData }) => {
  // console.log(weatherData);
  const [unit, setUnit] = React.useState("C");
  const [index, setIndex] = React.useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "slides",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  };

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  const handleCardClick = (event) => {
    setIndex(event);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="temp-unit">
        <FormControl component="fieldset" style={{ color: "whitesmoke" }}>
          <RadioGroup
            row
            aria-label="unit"
            name="controlled-radio-buttons-group"
            value={unit}
            onChange={handleChange}
          >
            <FormControlLabel value="C" control={<Radio />} label="Celsius" />
            <FormControlLabel
              value="F"
              control={<Radio />}
              label="Fahrenheit"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="refresh-btn">
        <Button
          style={{ backgroundColor: "#FFFFFF", color: "gray" }}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {weatherData.map((data, index) => {
            return (
              <WeatherCard
                key={index}
                index={index}
                data={data}
                unit={unit}
                cardClick={handleCardClick}
              ></WeatherCard>
            );
          })}
        </Slider>
      </div>
      <WeatherChart unit={unit} barData={weatherData[index]}></WeatherChart>
    </>
  ); 
};

export default WeatherComponent;
