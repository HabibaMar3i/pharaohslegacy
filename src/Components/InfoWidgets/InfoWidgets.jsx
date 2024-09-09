import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, MenuItem, CircularProgress, Alert, Grid, Container, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './InfoWidgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ClockAndDate() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = currentDateTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Card className="clock-card shadow">
            <CardContent>
                <Typography variant="h3" component="h1" className="clock-time">{formattedTime}</Typography>
                <Typography variant="h6" component="p" className="clock-date">{formattedDate}</Typography>
            </CardContent>
        </Card>
    );
}

function ExchangeRate() {
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/7d1d3095535e8bb2585f14b2/latest/EGP`
                );
                setExchangeRate(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchExchangeRate();
    }, []);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        if (e.target.value === '' || isNaN(e.target.value)) {
            setConvertedAmount(null);
        } else {
            const rate = exchangeRate?.conversion_rates[selectedCurrency];
            setConvertedAmount(rate ? (parseFloat(e.target.value) / rate).toFixed(2) : null);
        }
    };

    if (loading) return <div className="text-center my-3"><CircularProgress /></div>;
    if (error) return <div className="text-danger text-center my-3"><Alert severity="error">Error fetching exchange rates.</Alert></div>;

    const { conversion_rates: rates } = exchangeRate;

    return (
        <Card className="exchange-rate-card shadow">
            <CardContent>
                <Typography variant="h4" component="h2" className="exchange-rate-title">Exchange Rates</Typography>
                <TextField
                    select
                    label="Select Currency"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{ className: 'exchange-rate-input' }}
                >
                    {Object.keys(rates).map((currency) => (
                        <MenuItem key={currency} value={currency}>
                            {currency}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Enter Amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{ className: 'exchange-rate-input' }}
                />
                {convertedAmount !== null && (
                    <Alert severity="info" className="exchange-rate-result">
                        {amount} {selectedCurrency} is approximately {convertedAmount} EGP
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

function Weather() {
    const cities = [
        { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
        { name: 'Luxor', lat: 25.6872, lon: 32.6396 },
        { name: 'Aswan', lat: 24.0889, lon: 32.8998 },
        { name: 'Giza', lat: 30.0131, lon: 31.2089 },
    ];
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const responses = await Promise.all(
                    cities.map(city =>
                        axios.get(
                            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
                        )
                    )
                );
                const data = responses.reduce((acc, response, index) => {
                    acc[cities[index].name] = response.data.current_weather;
                    return acc;
                }, {});
                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) return <div className="text-center my-3"><CircularProgress /></div>;
    if (error) return <div className="text-danger text-center my-3"><Alert severity="error">Error fetching weather data.</Alert></div>;

    return (
        <Card className="weather-card shadow">
            <CardContent>
                <Typography variant="h4" component="h2" className="weather-title">Current Weather</Typography>
                <Grid container spacing={2}>
                    {cities.map(city => (
                        <Grid item xs={12} sm={6} md={3} key={city.name}>
                            <Card className="city-weather-card shadow">
                                <CardContent>
                                    <Typography variant="h6" component="h3">{city.name}</Typography>
                                    <Typography variant="body1">Temp: {weatherData[city.name]?.temperature ?? 'N/A'}°C</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}

function InfoWidgets() {
    return (
        <Container className="info-widgets-container my-5">
            <Box my={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Weather />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className="mt-4">
                    <Grid item xs={12} md={4}>
                        <ClockAndDate />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ExchangeRate />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

function InfoWidgetsModal({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWid>
            <DialogTitle>Widgets</DialogTitle>
            <DialogContent>
                <InfoWidgets />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export { InfoWidgetsModal };
export default InfoWidgets;

