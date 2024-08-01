import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';

function AddSuggestion() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            salutation: "",
            email: "",
            phone_no: "",
            type_of_activity: "",
            duration: "",
            detail: ""
        },
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
                .email('Invalid email address') // Added email validation
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
                .required('Details are required'),
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.salutation = data.salutation.trim();
            data.email = data.email.trim();
            data.phone_no = data.phone_no.trim();
            data.type_of_activity = data.type_of_activity.trim();
            data.duration = data.duration.trim();
            data.detail = data.detail.trim();

            console.log('Submitting data:', data); // Log the data being sent

            http.post("/Suggestion", data)
                .then((res) => {
                    console.log('Response:', res.data);
                    navigate("/Suggestion"); // Navigate to the "/Suggestion" route after successful submission
                })
                .catch((error) => {
                    console.error('Error submitting suggestion:', error.response?.data || error.message);
                    // Display an appropriate message to the user if needed
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Suggestion
            </Typography>
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
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddSuggestion;
