import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Collapse,
    IconButton,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { ExpandMore, ExpandLess, Info } from '@mui/icons-material';
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
    formControl: {
        margin: '1rem',
        minWidth: 120,
    },
    expandButton: {
        marginLeft: '1rem',
    },
    detailsBox: {
        marginTop: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    accordion: {
        marginBottom: '1rem',
    },
    brownButton: {
        backgroundColor: '#8B4513',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#A0522D',
        },
        borderRadius: '16px',
    },
    dialog: {
        '& .MuiPaper-root': {
            borderRadius: '16px',
        },
    },
    tableHeaderCell: {
        backgroundColor: '#8B4513',
        color: '#fff',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
        },
    }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: theme.palette.primary.main,
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

function ManageOrders() {
    const classes = useStyles;
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState({});
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const response = await axios.get('http://localhost/get_order.php');
            if (response.data.success) {
                setOrders(response.data.data);
                const initialStatus = response.data.data.reduce((acc, order) => {
                    acc[order.order_id] = order.status || '';
                    return acc;
                }, {});
                setOrderStatus(initialStatus);
            } else {
                console.error('Failed to fetch orders:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    async function updateOrderStatus(orderId) {
        try {
            const adminId = localStorage.getItem('admin_id');
            const formData = new FormData();
            formData.append('status', orderStatus[orderId]);
            const response = await axios.post(`http://localhost/order_status.php?order_id=${orderId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Admin-Id': adminId
                }
            });
            if (response.data.success) {
                toast.success(`Order ${orderId} status updated successfully`);
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            toast.error('Error updating order status');
        }
    }

    function handleStatusChange(event, orderId) {
        const { value } = event.target;
        setOrderStatus(prevStatus => ({
            ...prevStatus,
            [orderId]: value
        }));
    }

    function toggleOrderDetails(orderId) {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    }

    function handleClickOpen(order) {
        setCurrentOrder(order);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setCurrentOrder(null);
    }

    return (
        <Container style={classes.container}>
        
        <TitleTypography variant="h4" component="h1" align="center" sx={{ color: '#8B4513' }}>
                    Manage Orders
                </TitleTypography>
            <Toaster />
            <TableContainer component={Paper} style={{ borderRadius: '16px' }}>
                <Table style={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={classes.tableHeaderCell}>Order ID</StyledTableCell>
                            <StyledTableCell style={classes.tableHeaderCell}>Total Quantity</StyledTableCell>
                            <StyledTableCell style={classes.tableHeaderCell}>Total Price</StyledTableCell>
                            <StyledTableCell style={classes.tableHeaderCell}>Status</StyledTableCell>
                            <StyledTableCell style={classes.tableHeaderCell}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <React.Fragment key={order.order_id}>
                                <TableRow>
                                    <TableCell>{order.order_id}</TableCell>
                                    <TableCell>{order.total_quantity}</TableCell>
                                    <TableCell>{order.total_price}</TableCell>
                                    <TableCell>
                                        <TextField
                                            variant="outlined"
                                            value={orderStatus[order.order_id] || ''}
                                            onChange={(e) => handleStatusChange(e, order.order_id)}
                                            placeholder="Enter status"
                                            size="small"
                                            style={classes.textField}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => updateOrderStatus(order.order_id)}
                                            style={classes.brownButton}
                                        >
                                            Update Status
                                        </Button>
                                        <IconButton
                                            style={classes.expandButton}
                                            onClick={() => handleClickOpen(order)}
                                        >
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
                    {currentOrder && (
                        <Box style={classes.detailsBox}>
                            <Typography variant="body2" gutterBottom>
                                <strong>Tourist ID:</strong> {currentOrder.tourist_id}
                            </Typography>
                            <Accordion className={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography>Products</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {currentOrder.order_details.products.length > 0 ? (
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product ID</TableCell>
                                                    <TableCell>Product Name</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentOrder.order_details.products.map((product) => (
                                                    <TableRow key={product.product_id}>
                                                        <TableCell>{product.product_id}</TableCell>
                                                        <TableCell>{product.product_name}</TableCell>
                                                        <TableCell>{product.quantity}</TableCell>
                                                        <TableCell>{product.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <Typography>No products available</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography>Services</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {currentOrder.order_details.services.length > 0 ? (
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Service ID</TableCell>
                                                    <TableCell>Service Name</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentOrder.order_details.services.map((service) => (
                                                    <TableRow key={service.service_id}>
                                                        <TableCell>{service.service_id}</TableCell>
                                                        <TableCell>{service.service_name}</TableCell>
                                                        <TableCell>{service.quantity}</TableCell>
                                                        <TableCell>{service.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <Typography>No services available</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" style={classes.brownButton}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ManageOrders;
