import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Box, IconButton } from '@mui/material';
import { Person, People, Store, RoomService, Feedback, Event, HistoryEdu, ShoppingCart, Comment } from '@mui/icons-material';
import './AdminHomePage.css';

const AdminHomePage = () => {
    const [dataCounts, setDataCounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const adminName = localStorage.getItem('name') || 'Admin';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataCounts = async () => {
            try {
                const response = await axios.get('http://localhost/adminhomepage.php');
                if (response.data.success) {
                    setDataCounts(response.data.data);
                } else {
                    setError('Failed to fetch data counts');
                }
            } catch (err) {
                setError('Error fetching data counts');
            } finally {
                setLoading(false);
            }
        };

        fetchDataCounts();
    }, []);

    const icons = {
        tourist: Person,
        tour_personnel: People,
        products: Store,
        service: RoomService,
        orders: ShoppingCart,
        feedback: Comment,
        historical_places: HistoryEdu,
        meeting: Event,
        events: HistoryEdu
    };

    const titles = {
        tourist: "Tourists",
        tour_personnel: "Tour Personnel",
        products: "Products",
        service: "Services",
        orders: "Orders",
        feedback: "Feedback",
        historical_places: "Historical Places",
        meeting: "Meetings",
        events: "Events"
    };

    const handleIconClick = (key) => {
        const routes = {
            tourist: '/managetourists',
            tour_personnel: '/managepersonnel',
            products: '/manageproducts',
            service: '/manageservices',
            orders: '/manageorders',
            feedback: '/managefeedback',
            historical_places: '/viewreservation',
            meeting: '/meetingdetails',
            events: '/manageevents'
        };
        navigate(routes[key]);
    };

    return (
        <Container className="admin-homepage-container">
            <Box my={4} textAlign="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome back, {adminName}
                </Typography>
            </Box>
            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Grid container spacing={3}>
                    {Object.keys(dataCounts).map((key) => {
                        const IconComponent = icons[key];
                        return (
                            <Grid item xs={12} sm={6} md={4} key={key}>
                                <Card className="admin-card">
                                    <CardContent>
                                        <IconButton color="primary" className="icon-wrapper" onClick={() => handleIconClick(key)}>
                                            <IconComponent style={{ fontSize: 40 }} />
                                        </IconButton>
                                        <Typography variant="h5" component="div" className="title">
                                            {titles[key]}
                                        </Typography>
                                        <Typography variant="h6" className="count">
                                            {dataCounts[key].count}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default AdminHomePage;
