import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import WeatherCard from "../src/Components/WeatherCard.jsx";

const API_KEY = "cb2c83f63f7ec3921787e3fe50c35bcf";
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  background-color: #007bff;
  color: white;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const CityInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const App = () => {
  const [city, setCity] = useState(""); // State for the selected city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const fetchData = useCallback(async () => {
    if (!city) {
      return;
    }

    try {
      setLoading(true);
      setInvalidCity(false);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setInvalidCity(true);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
      setInvalidCity(true);
    } finally {
      setLoading(false);
    }
  }, [city, API_URL]);

  useEffect(() => {
    if (!city) {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [city, fetchData]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyUp = () => {
    setWeatherData(null);
  };

  return (
    <AppContainer>
      <Header>Pie Weather</Header>
      <ContentContainer>
        <InputContainer>
          <CityInput
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleCityChange}
            onKeyUp={handleKeyUp}
          />
          <SubmitButton onClick={fetchData}>Get Weather</SubmitButton>
        </InputContainer>
        {invalidCity && <p>No such city</p>}
        {loading ? (
          <p>Loading...</p>
        ) : weatherData ? (
          <WeatherCard data={weatherData} />
        ) : null}
      </ContentContainer>
    </AppContainer>
  );
};

export default App;
