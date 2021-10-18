import React from "react";
import { Chart } from "primereact/chart";
import './weatherchart.scss';

const WeatherChart = (props) => {
  const basicData = {
    labels: props.barData?.time,
    datasets: [
      {
        label: props.barData?.date,
        backgroundColor: "#E3E2DF",
        data:
          props.unit === "C"
            ? props.barData?.cTempArr
            : props.barData?.fTempArr,
      },
    ],
  };

  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#403d39",
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#403d39",
        },
      },
    },
  };

  return (
    <div className="bar-chart">
      <h3 className="bar-title">Weather forcast chart</h3>
      <Chart type="bar" data={basicData} options={basicOptions} />
    </div>
  );
};

export default WeatherChart;
