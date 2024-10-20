import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Alert as BootstrapAlert } from 'react-bootstrap';
import WeatherSummary from '../WeatherSummary';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const apiKey = process.env.Key; // Replace with your OpenWeatherMap API key
const interval = 5 * 60 * 1000; // 5 minutes

const WeatherMonitor = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const fetchedData = await Promise.all(
                    cities.map(city =>
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}`)
                    )
                );

                const processedData = fetchedData.map(response => {
                    const { main, weather, dt } = response.data;
                    const tempCelsius = main.temp - 273.15; // Convert from Kelvin to Celsius
                    return {
                        city: response.data.name,
                        temp: tempCelsius.toFixed(2),
                        feels_like: (main.feels_like - 273.15).toFixed(2),
                        mainWeather: weather[0].main,
                        timestamp: dt * 1000, // Convert to milliseconds
                    };
                });

                setWeatherData(processedData);
                checkForAlerts(processedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
        const intervalId = setInterval(fetchWeatherData, interval);

        return () => clearInterval(intervalId);
    }, []);

    const checkForAlerts = (data) => {
        data.forEach(item => {
            if (item.temp > 35) { // Example threshold
                setAlerts(prevAlerts => [...prevAlerts, `Alert: ${item.city} temperature exceeded 35°C`]);
            }
        });
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center">Weather Monitor</h1>
            {alerts.map((alert, index) => (
                <BootstrapAlert key={index} variant="danger">
                    {alert}
                </BootstrapAlert>
            ))}
            {weatherData.length > 0 ? (
                <WeatherSummary data={weatherData} />
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </Container>
    );
};

export default WeatherMonitor;
