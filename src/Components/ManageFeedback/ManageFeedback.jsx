import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { Info, ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';

const useStyles = {
    container: {
        marginTop: '2rem',
    },
    table: {
        minWidth: 650,
    },
    tableHeader: {
        backgroundColor: '#8B4513',
        color: '#fff',
    },
    dialog: {
        '& .MuiPaper-root': {
            borderRadius: '16px',
        },
    },
    infoIcon: {
        color: '#8B4513',
    },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: '#8B4513', // Brown color for table head
        color: theme.palette.common.white, // White color for text
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

function ManageFeedback() {
    const classes = useStyles;
    const [feedbackData, setFeedbackData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState(null);

    useEffect(() => {
        fetchFeedback();
    }, []);

    async function fetchFeedback() {
        try {
            const adminId = localStorage.getItem('admin_id');
            const response = await axios.get('http://localhost/admin_feedback.php', {
                headers: {
                    'Admin-Id': adminId
                }
            });
            if (response.data.success) {
                setFeedbackData(response.data.data);
            } else {
                console.error('Failed to fetch feedback:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    }

    const handleClickOpen = (feedback) => {
        setCurrentFeedback(feedback);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentFeedback(null);
    };

    return (
        <Container style={classes.container}>
            <TitleTypography variant="h4" component="h1" align="center" sx={{ color: '#8B4513' }}>
                Manage Feedback
            </TitleTypography>
            <Toaster />
            <TableContainer component={Paper} style={{ borderRadius: '16px' }}>
                <Table style={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Feedback ID</StyledTableCell>
                            <StyledTableCell>Tourist Name</StyledTableCell>
                            <StyledTableCell>Comment</StyledTableCell>
                            <StyledTableCell>Order ID</StyledTableCell>
                            <StyledTableCell>Is Satisfied?</StyledTableCell>
                            <StyledTableCell>Order Details</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedbackData.map((feedback) => (
                            <React.Fragment key={feedback.feedback_id}>
                                <TableRow>
                                    <TableCell>{feedback.feedback_id}</TableCell>
                                    <TableCell>{feedback.tourist_name}</TableCell>
                                    <TableCell>{feedback.comment}</TableCell>
                                    <TableCell>{feedback.order_id}</TableCell>
                                    <TableCell>{feedback.is_positive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleClickOpen(feedback)} style={classes.infoIcon}>
                                            <Info />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} style={classes.dialog}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {currentFeedback && (
                        <>
                            {currentFeedback.order_details.products.length > 0 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />} style={{ backgroundColor: '#8B4513', color: '#fff' }}>
                                        <Typography>Products</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Product ID</StyledTableCell>
                                                    <StyledTableCell>Product Name</StyledTableCell>
                                                    <StyledTableCell>Quantity</StyledTableCell>
                                                    <StyledTableCell>Price</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentFeedback.order_details.products.map(product => (
                                                    <TableRow key={product.product_id}>
                                                        <TableCell>{product.product_id}</TableCell>
                                                        <TableCell>{product.product_name}</TableCell>
                                                        <TableCell>{product.quantity}</TableCell>
                                                        <TableCell>{product.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            {currentFeedback.order_details.services.length > 0 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />} style={{ backgroundColor: '#8B4513', color: '#fff' }}>
                                        <Typography>Services</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Service ID</StyledTableCell>
                                                    <StyledTableCell>Service Name</StyledTableCell>
                                                    <StyledTableCell>Quantity</StyledTableCell>
                                                    <StyledTableCell>Price</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentFeedback.order_details.services.map(service => (
                                                    <TableRow key={service.service_id}>
                                                        <TableCell>{service.service_id}</TableCell>
                                                        <TableCell>{service.service_name}</TableCell>
                                                        <TableCell>{service.quantity}</TableCell>
                                                        <TableCell>{service.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default ManageFeedback;
