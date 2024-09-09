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

const DetailBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backgroundColor: '#FAFAFA',
    marginTop: theme.spacing(2),
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
    name: Yup.string().min(2).max(50).required('Service name is required'),
    description: Yup.string().min(2).required('Service description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required'),
    image: Yup.mixed(),
});

function ManageServices() {
    const theme = useTheme();

    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/admin_service.php');
            if (response.data.success) {
                setServices(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
        setLoading(false);
    }

    async function handleSubmit(values, { setSubmitting }) {
        const admin_id = localStorage.getItem('admin_id');
        let formData = new FormData();
        formData.append('action', serviceId ? 'update' : 'add');
        if (serviceId) {
            formData.append('service_id', serviceId);
        }
        for (let key in values) {
            if (values[key] !== null) {
                formData.append(key, values[key]);
            }
        }

        let url = serviceId 
            ? `http://localhost/update_service.php?service_id=${serviceId}` 
            : 'http://localhost/admin_service.php';

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
                toast.success(`Service ${serviceId ? 'updated' : 'added'} successfully`, {
                    duration: 1000,
                    position: 'top-center'
                });
                formik.resetForm();
                fetchServices();
                setServiceId(null);
                setInitialData(null);
                setOpen(false);
            } else {
                toast.error(`Failed to ${serviceId ? 'update' : 'add'} service: ${response.data.message}`, {
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

    async function handleDelete(serviceId) {
        try {
            const response = await axios.delete(`http://localhost/admin_service.php?service_id=${serviceId}`);
            if (response.data.success) {
                toast.success('Service deleted successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                fetchServices();
            } else {
                toast.error('Failed to delete service', {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error('Error deleting service', {
                duration: 1000,
                position: 'top-center'
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
            price: '',
            image: null,
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
        setServiceId(null);
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
                    Manage Services
                </TitleTypography>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <StyledButton variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add Service
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
                                <TableCell>Category</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.service_id}>
                                    <TableCell>{service.service_id}</TableCell>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>{service.price}</TableCell>
                                    <TableCell>{service.category}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Update Service">
                                            <IconButton color="primary" onClick={() => {
                                                setServiceId(service.service_id);
                                                setInitialData(service);
                                                formik.setValues(service);
                                                setOpen(true);
                                            }}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton color="error" onClick={() => handleDelete(service.service_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <StyledDialog open={open} onClose={handleClose}>
                    <DialogTitle>{serviceId ? 'Update Service' : 'Add Service'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below to {serviceId ? 'update' : 'add'} a service.
                        </DialogContentText>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Service Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Service Description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="category"
                                        name="category"
                                        label="Category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                        helperText={formik.touched.category && formik.errors.category}
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
                                {!serviceId && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="image"
                                            name="image"
                                            label="Image"
                                            type="file"
                                            onChange={(service) => formik.setFieldValue('image', service.target.files[0])}
                                            error={formik.touched.image && Boolean(formik.errors.image)}
                                            helperText={formik.touched.image && formik.errors.image}
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
                                    {serviceId ? 'Update' : 'Add'} Service
                                </StyledButton>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </StyledDialog>
            </Box>
        </Container>
    );
}

export default ManageServices;
