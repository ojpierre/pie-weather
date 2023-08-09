import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CardContainer = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-in-out;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const WeatherCard = ({ data }) => {
  const { name, main, weather } = data;
  const temperatureCelsius = main.temp - 273.15; // Convert Kelvin to Celsius

  return (
    <CardContainer
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading>{name}</Heading>
      <Info>Temperature: {temperatureCelsius.toFixed(2)}°C</Info>
      <Info>Humidity: {main.humidity}%</Info>
      <Info>Description: {weather[0].description}</Info>
    </CardContainer>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WeatherCard;
