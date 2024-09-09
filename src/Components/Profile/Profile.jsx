import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Card, CardContent, Typography, Button, CircularProgress, Alert, Box, Modal, TextField, Grid, Avatar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#795548', // Brown color
        },
    },
    shape: {
        borderRadius: 12, // Rounded corners
    },
});

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#8B4513', // Brown color
    color: '#FFFFFF', // White color
    '&:hover': {
        backgroundColor: '#A0522D', // Darker shade of brown
    },
}));

const Profile = () => {
    const [touristData, setTouristData] = useState({
        name: '', phone: '', DOB: '', ssn: '',
        gender: '', language: '', passportNO: '', nationality: '',
        address: '', postalcode: '', country: '', city: '', street: ''
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [open, setOpen] = useState(false);
    const touristId = localStorage.getItem('tourist_id');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost/touristdashboard.php', {
            headers: {
                'Tourist-Id': touristId
            }
        })
            .then(response => {
                setTouristData(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [touristId]);

    const handleChange = (e) => {
        setTouristData({
            ...touristData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdating(true);

        const formData = new FormData();
        Object.keys(touristData).forEach(key => {
            if (touristData[key] !== '') {
                formData.append(key, touristData[key]);
            }
        });

        axios.post('http://localhost/updateprofile.php', formData, {
            headers: {
                'Tourist-Id': touristId
            }
        })
            .then(response => {
                setSuccess(response.data.message);
                setUpdating(false);
                setOpen(false);
                toast.success('Profile updated successfully');
            })
            .catch(error => {
                setError(error.message);
                setUpdating(false);
                toast.error('Failed to update profile');
            });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleGoToPreviousDetails = () => {
        navigate('/previousorders');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={60} sx={{ color: '#795548' }} />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{marginTop:'150px'}}>
                <Box my={4}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                        <Avatar sx={{ width: 120, height: 120, mb: 2 }}>{touristData.name}</Avatar>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Name:</strong> {touristData.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Phone:</strong> {touristData.phone}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Date of Birth:</strong> {touristData.DOB}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>SSN:</strong> {touristData.ssn}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Gender:</strong> {touristData.gender}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Language:</strong> {touristData.language}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Passport Number:</strong> {touristData.passportNO}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Nationality:</strong> {touristData.nationality}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Address:</strong> {touristData.address}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Postal Code:</strong> {touristData.postalcode}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Country:</strong> {touristData.country}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>City:</strong> {touristData.city}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Street:</strong> {touristData.street}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <StyledButton variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                                Update Details
                            </StyledButton>
                            <Button variant="outlined" onClick={handleGoToPreviousDetails} sx={{ mt: 2, ml: 2 }}>
                                Go to Previous Orders
                            </Button>
                        </CardContent>
                    </Card>
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={touristData.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        value={touristData.phone}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="DOB"
                                        name="DOB"
                                        label="Date of Birth"
                                        type="date"
                                        value={touristData.DOB}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="ssn"
                                        name="ssn"
                                        label="SSN"
                                        value={touristData.ssn}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="gender"
                                        name="gender"
                                        label="Gender"
                                        value={touristData.gender}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="language"
                                        name="language"
                                        label="Language"
                                        value={touristData.language}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="passportNO"
                                        name="passportNO"
                                        label="Passport Number"
                                        value={touristData.passportNO}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="nationality"
                                        name="nationality"
                                        label="Nationality"
                                        value={touristData.nationality}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Address"
                                        value={touristData.address}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="postalcode"
                                        name="postalcode"
                                        label="Postal Code"
                                        value={touristData.postalcode}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="country"
                                        name="country"
                                        label="Country"
                                        value={touristData.country}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="city"
                                        name="city"
                                        label="City"
                                        value={touristData.city}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="street"
                                        name="street"
                                        label="Street"
                                        value={touristData.street}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <StyledButton type="submit" variant="contained" color="primary">
                                    {updating ? <CircularProgress size={24} /> : 'Update Profile'}
                                </StyledButton>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
                <Toaster />
            </Container>
        </ThemeProvider>
    );
};

export default Profile;
