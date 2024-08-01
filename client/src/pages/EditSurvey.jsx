import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditSurvey() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [survey, setSurvey] = useState({
        name_prog: "",
        schedule_timing: "",
        participation: "",
        effectiveness: "",
        good_effective: "",
        need_improvement: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/survey/${id}`).then((res) => {
            setSurvey(res.data);
            setLoading(false);
        });
    }, []);

    const formik = useFormik({
        initialValues: survey,
        enableReinitialize: true,
        validationSchema: yup.object({
            name_prog: yup.string().trim()
                .min(1, 'Program name cannot be empty')
                .max(100, 'Program name must be at most 100 characters')
                .required('Program name is required'),
            schedule_timing: yup.string().trim()
                .min(1, 'Lowest rating possible is 1.')
                .max(5, 'Highest rating possible is 5.')
                .required('Rating is required.'),
            participation: yup.string().trim()
                .min(1, 'Lowest rating possible is 1.')
                .max(5, 'Highest rating possible is 5.')
                .required('Rating is required.'),
            effectiveness: yup.string().trim()
                .min(1, 'Lowest rating possible is 1.')
                .max(5, 'Highest rating possible is 5.')
                .required('Rating is required.'),
            good_effective: yup.string()
                .max(500, 'Comment must be at most 500 characters'),
            need_improvement: yup.string().trim()
                .max(500, 'Comment must be at most 500 characters')
        }),
        onSubmit: (data) => {
            data.name_prog = data.name_prog.trim();
            data.schedule_timing = data.schedule_timing;
            data.participation = data.participation.trim();
            data.effectiveness = data.effectiveness.trim();
            data.good_effective = data.good_effective.trim();
            data.need_improvement = data.need_improvement.trim();
            http.put(`/survey/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/surveys");
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

    const deleteSurvey = () => {
        http.delete(`/survey/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/surveys");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Survey
            </Typography>
            {
                !loading && (
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="name_prog"
                            name="name_prog"
                            value={formik.values.name_prog}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name_prog && Boolean(formik.errors.name_prog)}
                            helperText={formik.touched.name_prog && formik.errors.name_prog}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="schedule_timing"
                            name="schedule_timing"
                            value={formik.values.schedule_timing}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.schedule_timing && Boolean(formik.errors.schedule_timing)}
                            helperText={formik.touched.schedule_timing && formik.errors.schedule_timing}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="participation"
                            name="participation"
                            value={formik.values.participation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.participation && Boolean(formik.errors.participation)}
                            helperText={formik.touched.participation && formik.errors.participation}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="effectiveness"
                            name="effectiveness"
                            value={formik.values.effectiveness}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.effectiveness && Boolean(formik.errors.effectiveness)}
                            helperText={formik.touched.effectiveness && formik.errors.effectiveness}

                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="good_effective"
                            name="good_effective"
                            value={formik.values.good_effective}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.good_effective && Boolean(formik.errors.good_effective)}
                            helperText={formik.touched.good_effective && formik.errors.good_effective}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="need_improvement"
                            name="need_improvement"
                            value={formik.values.need_improvement}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.need_improvement && Boolean(formik.errors.need_improvement)}
                            helperText={formik.touched.need_improvement && formik.errors.need_improvement}
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
                    Delete Survey
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this survey?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteSurvey}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditSurvey;