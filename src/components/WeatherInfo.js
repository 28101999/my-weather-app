import React from 'react';

function WeatherInfo({ data }) {
  return (
    <div>
      <h2>Current Weather</h2>
      <p>City: {data.name}</p>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Feels like: {data.main.feels_like}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind speed: {data.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherInfo;

