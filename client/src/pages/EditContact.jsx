import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        salutation: "",
        email: "",
        phone_no: "",
        reason: "",
        detail: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/contact/${id}`).then((res) => {
            setContact(res.data);
            setLoading(false);
        });
    }, [id]);

    const formik = useFormik({
        initialValues: contact,
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().trim()
                .min(2, 'Name must be at least 2 characters')
                .max(100, 'Name must be at most 100 characters')
                .required('Name is required'),
            salutation: yup.string().trim()
                .min(1, 'Salutation must be at least 1 characters')
                .max(4, 'Salutation must be at most 4 characters')
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
                .required('Details is required'),
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.salutation = data.salutation.trim();
            data.email = data.email.trim();
            data.phone_no = data.phone_no.trim();
            data.reason = data.reason.trim();
            data.detail = data.detail.trim();
            http.put(`/contact/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/contacts");
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

    const deleteContact = () => {
        http.delete(`/contact/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/contacts");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Contact Us Request
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
                            multiline minRows={2}
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
                                Update
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} color="error"
                                onClick={handleOpen}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Contact Us Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteContact}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditContact;