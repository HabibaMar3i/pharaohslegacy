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
    event_name: Yup.string().min(2).max(50).required('Event name is required'),
    event_description: Yup.string().min(2).required('Event description is required'),
    organizer: Yup.string().required('Organizer is required'),
    ticket_price: Yup.number().required('Ticket price is required'),
    picture: Yup.mixed(),
    date: Yup.date().required('Date is required'),
    event_link: Yup.string().url('Enter a valid URL').required('Event link is required')
});

function ManageEvents() {
    const theme = useTheme();

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/admin_events.php');
            if (response.data.success) {
                setEvents(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
        setLoading(false);
    }

    async function handleSubmit(values, { setSubmitting }) {
        const admin_id = localStorage.getItem('admin_id');
        let formData = new FormData();
        formData.append('action', eventId ? 'update' : 'add');
        if (eventId) {
            formData.append('event_id', eventId);
        }
        for (let key in values) {
            if (values[key] !== null) {
                formData.append(key, values[key]);
            }
        }

        let url = eventId 
            ? `http://localhost/update_event.php?event_id=${eventId}` 
            : 'http://localhost/admin_events.php';

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
                toast.success(`Event ${eventId ? 'updated' : 'added'} successfully`, {
                    duration: 1000,
                    position: 'top-center'
                });
                formik.resetForm();
                fetchEvents();
                setEventId(null);
                setInitialData(null);
                setOpen(false);
            } else {
                toast.error(`Failed to ${eventId ? 'update' : 'add'} event: ${response.data.message}`, {
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

    async function handleDelete(eventId) {
        try {
            const response = await axios.delete(`http://localhost/admin_events.php?event_id=${eventId}`);
            if (response.data.success) {
                toast.success('Event deleted successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                fetchEvents();
            } else {
                toast.error('Failed to delete event', {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error('Error deleting event', {
                duration: 1000,
                position: 'top-center'
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            event_name: '',
            event_description: '',
            organizer: '',
            ticket_price: '',
            picture: null,
            date: '',
            event_link: '',
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
        setEventId(null);
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
                    Manage Events
                </TitleTypography>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <StyledButton variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add Event
                    </StyledButton>
                </Box>
                <TableContainer component={Paper} style={{ borderRadius: '16px' }}>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Ticket Price</TableCell>
                                <TableCell>Organizer</TableCell>
                                <TableCell>Link</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.event_id}>
                                    <TableCell>{event.event_id}</TableCell>
                                    <TableCell>{event.event_name}</TableCell>
                                    <TableCell>{event.event_description}</TableCell>
                                    <TableCell>{event.ticket_price}</TableCell>
                                    <TableCell>{event.organizer}</TableCell>
                                    <TableCell>{event.event_link}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Update Event">
                                            <IconButton color="primary" onClick={() => {
                                                setEventId(event.event_id);
                                                setInitialData(event);
                                                formik.setValues(event);
                                                setOpen(true);
                                            }}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton color="error" onClick={() => handleDelete(event.event_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <StyledDialog open={open} onClose={handleClose}>
                    <DialogTitle>{eventId ? 'Update Event' : 'Add Event'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below to {eventId ? 'update' : 'add'} an event.
                        </DialogContentText>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="event_name"
                                        name="event_name"
                                        label="Event Name"
                                        value={formik.values.event_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.event_name && Boolean(formik.errors.event_name)}
                                        helperText={formik.touched.event_name && formik.errors.event_name}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="event_description"
                                        name="event_description"
                                        label="Event Description"
                                        value={formik.values.event_description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.event_description && Boolean(formik.errors.event_description)}
                                        helperText={formik.touched.event_description && formik.errors.event_description}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="organizer"
                                        name="organizer"
                                        label="Organizer"
                                        value={formik.values.organizer}
                                        onChange={formik.handleChange}
                                        error={formik.touched.organizer && Boolean(formik.errors.organizer)}
                                        helperText={formik.touched.organizer && formik.errors.organizer}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="ticket_price"
                                        name="ticket_price"
                                        label="Ticket Price"
                                        type="number"
                                        value={formik.values.ticket_price}
                                        onChange={formik.handleChange}
                                        error={formik.touched.ticket_price && Boolean(formik.errors.ticket_price)}
                                        helperText={formik.touched.ticket_price && formik.errors.ticket_price}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="date"
                                        name="date"
                                        label="Date"
                                        type="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        helperText={formik.touched.date && formik.errors.date}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="event_link"
                                        name="event_link"
                                        label="Event Link"
                                        value={formik.values.event_link}
                                        onChange={formik.handleChange}
                                        error={formik.touched.event_link && Boolean(formik.errors.event_link)}
                                        helperText={formik.touched.event_link && formik.errors.event_link}
                                        InputProps={{
                                            sx: { borderRadius: '16px' },
                                        }}
                                    />
                                </Grid>
                                {!eventId && (
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
                                    {eventId ? 'Update' : 'Add'} Event
                                </StyledButton>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </StyledDialog>
            </Box>
        </Container>
    );
}

export default ManageEvents;
