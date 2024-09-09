import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: '#8B4513', // Brown color
        color: theme.palette.common.white,
    },
    '&.MuiTableCell-body': {
        fontSize: 14,
    },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
}));

const useStyles = {
    container: {
        marginTop: '2rem',
    },
    card: {
        marginBottom: '1rem',
        padding: '1rem',
    },
    accordion: {
        marginBottom: '1rem',
        '& .MuiAccordionSummary-root': {
            backgroundColor: '#8B4513', // Brown color
            color: '#fff',
        },
        '& .MuiAccordionDetails-root': {
            backgroundColor: '#f5f5f5',
        },
    },
    table: {
        marginBottom: '1rem',
    },
};

const fieldMapping = {
    plan_id: 'Plan ID',
    person_name: 'Name',
    email: 'Email',
    phone: 'Phone',
    ssn: 'SSN',
    person_dob: 'Date of Birth',
    address: 'Address',
    postalcode: 'Postal Code',
    country: 'Country',
    city: 'City',
    street: 'Street',
    meeting_time: 'Meeting Time',
    meeting_date: 'Meeting Date',
    visit_start_date: 'Visit Start Date',
    visit_end_date: 'Visit End Date',
    people_count: 'People Count',
    place: 'Place',
    budget: 'Budget',
    class: 'Class',
    preference: 'Preference',
};

function ViewReservation() {
    const classes = useStyles;
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlans();
    }, []);

    async function fetchPlans() {
        try {
            const response = await axios.get('http://localhost/getplan.php');
            if (response.data.success) {
                setPlans(response.data.plans);
            } else {
                console.error('Failed to fetch plans:', response.data.error);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching plans:', error);
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container style={classes.container}>
            <TitleTypography variant="h4" component="h1" align="center" sx={{ color: '#8B4513' }}>
                View Reservation
            </TitleTypography>
            {plans.map((plan, index) => (
                <Card key={index} style={classes.card}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Reservation Information</Typography>
                        <Grid container spacing={2}>
                            {Object.keys(fieldMapping).map((field) => (
                                <Grid item xs={12} sm={6} key={field}>
                                    <Typography><strong>{fieldMapping[field]}:</strong> {plan[field]}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                        {plan.dependant_name && (
                            <Accordion style={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Dependant Information</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper} style={classes.table}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Dependant Name</StyledTableCell>
                                                    <StyledTableCell>Gender</StyledTableCell>
                                                    <StyledTableCell>Date of Birth</StyledTableCell>
                                                    <StyledTableCell>Passenger</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{plan.dependant_name}</TableCell>
                                                    <TableCell>{plan.dependant_gender}</TableCell>
                                                    <TableCell>{plan.dependant_dob}</TableCell>
                                                    <TableCell>{plan.dependant_passenger}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default ViewReservation;
