import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Box,
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    Grid,
    CircularProgress,
    DialogContentText,
    Tooltip,
    useTheme,
    styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: '#8B4513', // Brown color
    '& .MuiTableCell-root': {
        color: '#FFFFFF', // White color
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#8B4513', // Brown color
    color: '#FFFFFF', // White color
    '&:hover': {
        backgroundColor: '#A0522D', // Darker shade of brown
    },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '16px', // Rounded modal
    },
}));

const validationSchema = Yup.object({
    product_name: Yup.string().min(2).max(50).required('Product name is required'),
    product_description: Yup.string().min(2).required('Product description is required'),
    rate: Yup.number().required('Rate is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    picture: Yup.mixed(),
});

function ManageProducts() {
    const theme = useTheme();

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/admin_product.php');
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
        setLoading(false);
    }

    async function handleSubmit(values, { setSubmitting }) {
        const admin_id = localStorage.getItem('admin_id');
        let formData = new FormData();
        formData.append('action', productId ? 'update' : 'add');
        if (productId) {
            formData.append('product_id', productId);
        }
        for (let key in values) {
            if (values[key] !== null) {
                formData.append(key, values[key]);
            }
        }

        let url = productId 
            ? `http://localhost/update_product.php?product_id=${productId}` 
            : 'http://localhost/admin_product.php';

        try {
            const response = await axios({
                method: 'POST',
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Admin-Id': admin_id
                },
            });

            if (response.data.success) {
                toast.success(`Product ${productId ? 'updated' : 'added'} successfully`, {
                    duration: 1000,
                    position: 'top-center'
                });
                formik.resetForm();
                fetchProducts();
                setProductId(null);
                setInitialData(null);
                setOpen(false);
            } else {
                toast.error(`Failed to ${productId ? 'update' : 'add'} product: ${response.data.message}`, {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                duration: 1000,
                position: 'top-center'
            });
        }
        setSubmitting(false);
    }

    async function handleDelete(productId) {
        try {
            const response = await axios.delete(`http://localhost/admin_product.php?product_id=${productId}`);
            if (response.data.success) {
                toast.success('Product deleted successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                fetchProducts();
            } else {
                toast.error('Failed to delete product', {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error('Error deleting product', {
                duration: 1000,
                position: 'top-center'
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_description: '',
            rate: '',
            price: '',
            quantity: '',
            picture: null,
            ...initialData
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setProductId(null);
        setInitialData(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container>
            <Box sx={{ marginTop: '2rem' }}>
                <TitleTypography variant="h4" component="h1" align="center" sx={{ color: '#8B4513' }}>
                    Manage Products
                </TitleTypography>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <StyledButton variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add Product
                    </StyledButton>
                </Box>
                <TableContainer component={Paper} style={{ borderRadius: '16px' }}>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Rate</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.product_id}>
                                    <TableCell>{product.product_id}</TableCell>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.product_description}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.rate}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Update Product">
                                            <IconButton color="primary" onClick={() => {
                                                setProductId(product.product_id);
                                                setInitialData(product);
                                                formik.setValues(product);
                                                setOpen(true);
                                            }}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton color="error" onClick={() => handleDelete(product.product_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <StyledDialog open={open} onClose={handleClose}>
                    <DialogTitle>{productId ? 'Update Product' : 'Add Product'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below to {productId ? 'update' : 'add'} a product.
                        </DialogContentText>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="product_name"
                                        name="product_name"
                                        label="Product Name"
                                        value={formik.values.product_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.product_name && Boolean(formik.errors.product_name)}
                                        helperText={formik.touched.product_name && formik.errors.product_name}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="product_description"
                                        name="product_description"
                                        label="Product Description"
                                        value={formik.values.product_description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.product_description && Boolean(formik.errors.product_description)}
                                        helperText={formik.touched.product_description && formik.errors.product_description}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="rate"
                                        name="rate"
                                        label="Rate"
                                        type="number"
                                        value={formik.values.rate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rate && Boolean(formik.errors.rate)}
                                        helperText={formik.touched.rate && formik.errors.rate}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="price"
                                        name="price"
                                        label="Price"
                                        type="number"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="quantity"
                                        name="quantity"
                                        label="Quantity"
                                        type="number"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                        helperText={formik.touched.quantity && formik.errors.quantity}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                {!productId && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="picture"
                                            name="picture"
                                            label="Picture"
                                            type="file"
                                            onChange={(event) => formik.setFieldValue('picture', event.target.files[0])}
                                            error={formik.touched.picture && Boolean(formik.errors.picture)}
                                            helperText={formik.touched.picture && formik.errors.picture}
                                            InputProps={{
                                                sx: { borderRadius: '16px' },
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <StyledButton type="submit" variant="contained" color="primary">
                                    {productId ? 'Update' : 'Add'} Product
                                </StyledButton>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </StyledDialog>
            </Box>
        </Container>
    );
}

export default ManageProducts;
