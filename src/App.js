import React, { useState, useEffect, useCallback } from 'react';
import backgroundImage from './img/background-image.jpg';
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import GeolocationError from './components/GeolocationError';
import './App.css';

const API_KEY = '51fa5ee0dc9f2da91d8c5d0746aa18dd';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setError(error.message);
      }
    );
  }, [fetchWeatherData]);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setWeatherData(null);
    setError(null);
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="App">
        <h1 className="App-header">Weather App</h1>
        {error ? (
          <GeolocationError message={error} onClear={handleClear} />
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <WeatherForm onSearch={handleSearch} />
            {weatherData && <WeatherInfo data={weatherData} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
