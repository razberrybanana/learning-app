import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditSuggestion() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [suggestion, setSuggestion] = useState({
        name: "",
        salutation: "",
        email: "",
        phone_no: "",
        type_of_activity: "",
        duration: "",
        detail: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            http.get(`/suggestion/${id}`)
                .then((res) => {
                    console.log('Fetched suggestion data:', res.data);
                    setSuggestion(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching suggestion:', error.response ? error.response.data : error.message);
                    setLoading(false);
                });
        } else {
            console.error('ID is missing from URL');
            setLoading(false);
        }
    }, [id]);

    const formik = useFormik({
        initialValues: {
            name: suggestion.name,
            salutation: suggestion.salutation,
            email: suggestion.email,
            phone_no: suggestion.phone_no,
            type_of_activity: suggestion.type_of_activity,
            duration: suggestion.duration,
            detail: suggestion.detail
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().trim()
                .min(2, 'Name must be at least 2 characters')
                .max(100, 'Name must be at most 100 characters')
                .required('Name is required'),
            salutation: yup.string().trim()
                .min(1, 'Salutation must be at least 1 character')
                .max(4, 'Salutation must be at most 4 characters')
                .required('Salutation is required'),
            email: yup.string().trim()
                .min(10, 'Email must be at least 10 characters')
                .max(100, 'Email must be at most 100 characters')
                .required('Email is required'),
            phone_no: yup.string().trim()
                .min(8, 'Phone number must be at least 8 characters')
                .max(15, 'Phone number must be at most 15 characters')
                .required('Phone number is required'),
            type_of_activity: yup.string().trim()
                .min(4, 'Type of activity must be at least 4 characters')
                .max(100, 'Type of activity must be at most 100 characters')
                .required('Type of activity is required'),
            duration: yup.string().trim()
                .min(10, 'Duration must be at least 10 characters')
                .max(100, 'Duration must be at most 100 characters')
                .required('Duration is required'),
            detail: yup.string().trim()
                .min(10, 'Details must be at least 10 characters')
                .max(500, 'Details must be at most 500 characters')
                .required('Details are required')
        }),
        onSubmit: (data) => {
            if (!id) {
                console.error('ID is missing');
                return;
            }

            const { name, salutation, email, phone_no, type_of_activity, duration, detail } = data;
            const updateData = { name, salutation, email, phone_no, type_of_activity, duration, detail };

            console.log('Submitting data:', updateData);

            http.put(`/suggestion/${id}`, updateData)
                .then((res) => {
                    console.log('Response after update:', res.data);
                    navigate("/Suggestion");
                })
                .catch((error) => {
                    console.error('Error response data:', error.response ? error.response.data : 'No response data');
                    console.error('Error response status:', error.response ? error.response.status : 'No status code');
                    console.error('Error response headers:', error.response ? error.response.headers : 'No headers');
                    console.error('Error message:', error.message);
                });
        }
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteSuggestion = () => {
        if (!id) {
            console.error('ID is missing');
            return;
        }

        http.delete(`/suggestion/${id}`)
            .then((res) => {
                console.log('Suggestion deleted:', res.data);
                navigate("/Suggestion");
            })
            .catch((error) => {
                console.error('Error response data:', error.response ? error.response.data : 'No response data');
                console.error('Error response status:', error.response ? error.response.status : 'No status code');
                console.error('Error response headers:', error.response ? error.response.headers : 'No headers');
                console.error('Error message:', error.message);
            });
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Suggestion
            </Typography>
            {
                !loading && (
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Salutation"
                            name="salutation"
                            value={formik.values.salutation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.salutation && Boolean(formik.errors.salutation)}
                            helperText={formik.touched.salutation && formik.errors.salutation}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Phone Number"
                            name="phone_no"
                            value={formik.values.phone_no}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                            helperText={formik.touched.phone_no && formik.errors.phone_no}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Type of Activity"
                            name="type_of_activity"
                            value={formik.values.type_of_activity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type_of_activity && Boolean(formik.errors.type_of_activity)}
                            helperText={formik.touched.type_of_activity && formik.errors.type_of_activity}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Duration"
                            name="duration"
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Details"
                            name="detail"
                            value={formik.values.detail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.detail && Boolean(formik.errors.detail)}
                            helperText={formik.touched.detail && formik.errors.detail}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" type="submit">
                                Update
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} color="error" onClick={handleOpen}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Suggestion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Suggestion?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={deleteSuggestion}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditSuggestion;
