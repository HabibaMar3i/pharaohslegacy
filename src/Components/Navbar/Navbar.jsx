import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem, Divider, Avatar, Box } from '@mui/material';
import { Home, People, Assignment, Event, ShoppingCart, ExitToApp, Info as InfoIcon, Place, ListAlt, History, Person, AddShoppingCart, Favorite, RateReview, ArrowDropDown } from '@mui/icons-material';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';
import InfoWidgetsModal from '../InfoWidgetsModal/InfoWidgetsModal';

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [premiumAnchorEl, setPremiumAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleExploreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExploreClose = () => {
        setAnchorEl(null);
    };

    const handlePremiumClick = (event) => {
        setPremiumAnchorEl(event.currentTarget);
    };

    const handlePremiumClose = () => {
        setPremiumAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost/logout.php', { action: 'logout' });

            if (response.data.success) {
                localStorage.clear();
                console.log('Logged out successfully');
                window.location.href = '/login';
            } else {
                console.error('Logout failed:', response.data.message);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const userType = localStorage.getItem('user_type');
    const subscriptionId = localStorage.getItem('subscription_id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const isLoggedIn = userType !== null;
    const isAdmin = userType === 'admin';
    const isTourist = userType === 'tourist';

    const getInitials = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    return (
        <>
            {isAdmin ? (
                <Drawer
                    sx={{
                        width: 280,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 280,
                            boxSizing: 'border-box',
                            backgroundColor: '#302E2F', // Dark background
                            color: '#FFFFFF', // White text color
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 2,
                            backgroundColor: '#302E2F',
                            color: '#FFFFFF',
                        }}
                    >
                        <Avatar sx={{ width: 56, height: 56, bgcolor: '#8B4513' }}>
                            {getInitials(name)}
                        </Avatar>
                        <Typography variant="h6" sx={{ mt: 1 }}>{name}</Typography>
                        <Typography variant="body2" sx={{ color: '#FFFFFF' }}>{email}</Typography>
                    </Box>
                    <Divider sx={{ backgroundColor: '#FFFFFF' }} />
                    <List>
                        <ListItem button component={Link} to="/adminhomepage">
                            <ListItemIcon><Home sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Admin Homepage" />
                        </ListItem>
                        <ListItem button component={Link} to="/managetourists">
                            <ListItemIcon><People sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Tourists" />
                        </ListItem>
                        <ListItem button component={Link} to="/managepersonnel">
                            <ListItemIcon><Person sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Personnel" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageservices">
                            <ListItemIcon><Assignment sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Services" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageproducts">
                            <ListItemIcon><AddShoppingCart sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Products" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageevents">
                            <ListItemIcon><Event sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Events" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageorders">
                            <ListItemIcon><ListAlt sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Orders" />
                        </ListItem>
                        <ListItem button component={Link} to="/managefeedback">
                            <ListItemIcon><RateReview sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Manage Feedback" />
                        </ListItem>
                        <ListItem button component={Link} to="/viewreservation">
                            <ListItemIcon><Place sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="View Reservation" />
                        </ListItem>
                        <ListItem button onClick={handleLogout} sx={{ color: '#FFFFFF' }}>
                            <ListItemIcon><ExitToApp sx={{ color: '#FFFFFF' }} /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
            ) : (
                <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#FFFFFF' }}>
                    <Toolbar>
                        <Typography variant="h6" component={Link} to="/homepage" sx={{ flexGrow: 1, textDecoration: 'none', color: '#FFFFFF' }} className="navbar-brand">
                            Pharaohs Legacy
                        </Typography>
                        <Button color="inherit" component={Link} to="/aboutus" className="nav-button">About Us</Button>
                        <Button color="inherit" className="nav-button" onClick={handleExploreClick}>
                            Explore <ArrowDropDown />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleExploreClose}
                            MenuListProps={{ className: 'explore-menu' }}
                        >
                            <MenuItem component={Link} to="/events" onClick={handleExploreClose}>Events</MenuItem>
                            <MenuItem component={Link} to="/historicalplaces" onClick={handleExploreClose}>Historical Places</MenuItem>
                            <MenuItem component={Link} to="/historicalcontent" onClick={handleExploreClose}>Historical Content</MenuItem>
                            {isLoggedIn && isTourist && (
                                <>
                                    <MenuItem component={Link} to="/products" onClick={handleExploreClose}>Products</MenuItem>
                                    <MenuItem component={Link} to="/services" onClick={handleExploreClose}>Services</MenuItem>
                                </>
                            )}
                        </Menu>
                        <Button color="inherit" onClick={() => setModalOpen(true)} className="nav-button"><InfoIcon /></Button>
                        {isLoggedIn && isTourist && (
                            <>
                                {subscriptionId === '2' && (
                                    <>
                                        <Button color="inherit" className="nav-button" onClick={handlePremiumClick}>
                                            Premium Services <ArrowDropDown />
                                        </Button>
                                        <Menu
                                            anchorEl={premiumAnchorEl}
                                            open={Boolean(premiumAnchorEl)}
                                            onClose={handlePremiumClose}
                                            MenuListProps={{ className: 'explore-menu' }}
                                        >
                                            <MenuItem component={Link} to="/planmeeting" onClick={handlePremiumClose}>Plan Meeting</MenuItem>
                                            <MenuItem component={Link} to="/ai" onClick={handlePremiumClose}>AI</MenuItem>
                                        </Menu>
                                    </>

                                )}
                                <Button color="inherit" component={Link} to="/wishlist" className="nav-button nav-icon"><Favorite /></Button>
                                <Button color="inherit" component={Link} to="/cart" className="nav-button nav-icon"><ShoppingCart /></Button>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#8B4513', mr: 3 }} onClick={() => window.location.href = '/profile'}>
                                    {getInitials(name)}
                                </Avatar>
                                {subscriptionId !== '2' && (
                                    <Button color="inherit" component={Link} to="/subscription" className="nav-button btn-subscribe mx-1">Subscribe</Button>
                                )}
                                <Button color="inherit" onClick={handleLogout} className="btn-logout">Logout</Button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <Button color="inherit" component={Link} to="/login" className="btn-login">Login</Button>
                        )}
                    </Toolbar>
                </AppBar>
            )}
            <InfoWidgetsModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};

export default NavigationBar;
