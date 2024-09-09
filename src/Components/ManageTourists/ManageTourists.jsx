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
import './ManageTourists.css';

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
    firstname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
    lastname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Too Short").max(14, "Too Long!").required("Password is required"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required("Confirmation password is required"),
    phone: Yup.string().required("Phone number is required"),
    DOB: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    language: Yup.string().required("Language is required"),
    ssn: Yup.string().required("SSN is required"),
    passportNO: Yup.string().required("Passport number is required"),
    nationality: Yup.string().required("Nationality is required"),
    address: Yup.string().required("Address is required"),
    postalcode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required")
});

function ManageTourists() {
    const theme = useTheme();

    const [msg, setMsg] = useState('');
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        axios.get('http://localhost/admin_tourist.php')
            .then(response => {
                if (response.data.success) {
                    setPersons(response.data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                setMsg('Failed to load tourists');
                setLoading(false);
            });
    }, []);

    async function deletePerson(person_id) {
        try {
            const response = await axios.delete(`http://localhost/admin_tourist.php?person_id=${person_id}`);
            if (response.data.success) {
                toast.success('Tourist deleted successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                setPersons(persons.filter(person => person.person_id !== person_id));
            } else {
                toast.error('Oops, Something went wrong..', {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            setMsg('Failed to delete tourist');
        }
    }

    async function addTourist(values, { setSubmitting }) {
        try {
            let formData = new FormData();
            Object.keys(values).forEach(key => formData.append(key, values[key]));

            const response = await axios.post('http://localhost/admin_tourist.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                axios.get('http://localhost/admin_tourist.php')
                    .then(response => {
                        if (response.data.success) {
                            setPersons(response.data.data);
                            toast.success('Tourist added successfully', {
                                duration: 1000,
                                position: 'top-center'
                            });
                        }
                    })
                    .catch(error => setMsg('Failed to load tourists'));
                formik.resetForm();
                setOpen(false);
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            toast.error('Oops, Something went wrong..', {
                duration: 1000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            firstname: '', lastname: '', email: '', password: '', confirmpassword: '', phone: '', DOB: '', gender: '', language: '', ssn: '', passportNO: '', nationality: '', address: '', postalcode: '', country: '', city: '', street: ''
        },
        validationSchema,
        onSubmit: addTourist
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const handleDetailOpen = (person) => {
        setSelectedPerson(person);
        setDetailOpen(true);
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
        setSelectedPerson(null);
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
                   Manage Tourists
                </TitleTypography>
                {msg && <Typography color="error" align="center">{msg}</Typography>}
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <StyledButton variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add Tourist
                    </StyledButton>
                </Box>
                <TableContainer component={Paper} style={{ borderRadius: '16px' }}>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Nationality</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {persons.map((person) => (
                                <TableRow key={person.person_id}>
                                    <TableCell>{person.name}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                    <TableCell>{person.phone}</TableCell>
                                    <TableCell>{person.gender}</TableCell>
                                    <TableCell>{person.nationality}</TableCell>
                                    <TableCell>
                                        <Tooltip title="View Details">
                                            <IconButton color="primary" onClick={() => handleDetailOpen(person)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton color="error" onClick={() => deletePerson(person.person_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <StyledDialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Tourist</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below to add a new tourist.
                        </DialogContentText>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="firstname"
                                        name="firstname"
                                        label="First name"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                        helperText={formik.touched.firstname && formik.errors.firstname}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastname"
                                        name="lastname"
                                        label="Last name"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                        helperText={formik.touched.lastname && formik.errors.lastname}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
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
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        label="Confirm Password"
                                        type="password"
                                        value={formik.values.confirmpassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                        helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
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
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
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
                                        value={formik.values.DOB}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DOB && Boolean(formik.errors.DOB)}
                                        helperText={formik.touched.DOB && formik.errors.DOB}
                                        InputLabelProps={{
                                            shrink: true,
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
                                        value={formik.values.nationality}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                                        helperText={formik.touched.nationality && formik.errors.nationality}
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
                                        value={formik.values.language}
                                        onChange={formik.handleChange}
                                        error={formik.touched.language && Boolean(formik.errors.language)}
                                        helperText={formik.touched.language && formik.errors.language}
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
                                        value={formik.values.ssn}
                                        onChange={formik.handleChange}
                                        error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                                        helperText={formik.touched.ssn && formik.errors.ssn}
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
                                        value={formik.values.passportNO}
                                        onChange={formik.handleChange}
                                        error={formik.touched.passportNO && Boolean(formik.errors.passportNO)}
                                        helperText={formik.touched.passportNO && formik.errors.passportNO}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
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
                                        value={formik.values.postalcode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.postalcode && Boolean(formik.errors.postalcode)}
                                        helperText={formik.touched.postalcode && formik.errors.postalcode}
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
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                        helperText={formik.touched.country && formik.errors.country}
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
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
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
                                        value={formik.values.street}
                                        onChange={formik.handleChange}
                                        error={formik.touched.street && Boolean(formik.errors.street)}
                                        helperText={formik.touched.street && formik.errors.street}
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
                                    Add Tourist
                                </StyledButton>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </StyledDialog>
                <StyledDialog open={detailOpen} onClose={handleDetailClose}>
                    <DialogTitle>Tourist Details</DialogTitle>
                    <DialogContent>
                        {selectedPerson && (
                            <DetailBox>
                                <Typography><b>Name:</b> {selectedPerson.name}</Typography>
                                <Typography><b>Email:</b> {selectedPerson.email}</Typography>
                                <Typography><b>Phone:</b> {selectedPerson.phone}</Typography>
                                <Typography><b>Date of Birth:</b> {selectedPerson.DOB}</Typography>
                                <Typography><b>Gender:</b> {selectedPerson.gender}</Typography>
                                <Typography><b>Language:</b> {selectedPerson.language}</Typography>
                                <Typography><b>SSN:</b> {selectedPerson.ssn}</Typography>
                                <Typography><b>Passport No:</b> {selectedPerson.passportNO}</Typography>
                                <Typography><b>Nationality:</b> {selectedPerson.nationality}</Typography>
                                <Typography><b>Address:</b> {selectedPerson.address}</Typography>
                                <Typography><b>Postal Code:</b> {selectedPerson.postalcode}</Typography>
                                <Typography><b>Country:</b> {selectedPerson.country}</Typography>
                                <Typography><b>City:</b> {selectedPerson.city}</Typography>
                                <Typography><b>Street:</b> {selectedPerson.street}</Typography>
                            </DetailBox>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDetailClose} sx={{ color: '#000000' }}>
                            Close
                        </Button>
                    </DialogActions>
                </StyledDialog>
            </Box>
        </Container>
    );
}

export default ManageTourists;
