import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./weathercard.scss";

const WeatherCard = (props) => {
  const weatherData = props.data;
  const icon = weatherData.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const date = new Date(weatherData.date).toDateString();

  const handleClick = () => {
    props.cardClick(props.index);
  }

  return (
    <Card className='cardItem' onClick={handleClick}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="white">
          {weatherData.desc}
        </Typography>
        <Typography variant="h5" component="div" className="display-temp" color="white">
          {props.unit === 'C' ? <p>{weatherData.temp} &#8451;</p> : <p>{((weatherData.temp * 9/5) + 32).toFixed(2)} &#8457;</p>}
          <img src={iconUrl} alt='weather icon'/>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="white">
          <p>{date}</p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
