import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';

function AddContact() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            salutation: "",
            email: "",
            phone_no: "",
            reason: "",
            detail: ""
        },
        validationSchema: yup.object({
            name: yup.string().trim()
                .min(3, 'Name must be at least 2 characters')
                .max(100, 'Name must be at most 100 characters')
                .required('Name is required'),
            salutation: yup.string().trim()
                .min(2, 'Salutation must be at least 1 characters')
                .max(3, 'Salutation must be at most 4 characters')
                .required('Salutation is required'),
            email: yup.string().trim()
                .min(10, 'email must be at least 10 characters')
                .max(100, 'email must be at most 100 characters')
                .required('email is required'),
            phone_no: yup.string().trim()
                .min(8, 'Phone number must be at least 8 characters')
                .max(15, 'Phone number must be at most 15 characters')
                .required('Phone number is required'),
            reason: yup.string().trim()
                .min(10, 'Reason must be at least 10 characters')
                .max(100, 'Reason must be at most 100 characters')
                .required('Reason is required'),
            detail: yup.string().trim()
                .min(10, 'Details must be at least 10 characters')
                .max(500, 'Details must be at most 500 characters')
                .required('Details is required')
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.salutation = data.salutation.trim();
            data.email = data.email.trim();
            data.phone_no = data.phone_no.trim();
            data.reason = data.reason.trim();
            data.detail = data.detail.trim();
            http.post("/contact", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/contacts");
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Contact Us Request
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
                    label="Reason"
                    name="reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={formik.touched.reason && formik.errors.reason}
                />
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    multiline minRows={4}
                    label="Detail"
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

export default AddContact;