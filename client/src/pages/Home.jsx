import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http'
import { useNavigate } from 'react-router-dom';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions
} from '@mui/material';

function WelcomePage() {
    return (
      <div className="welcome">
        <h1>Welcome!</h1>
        <p>This is a simple welcome page.</p>
      </div>
    );
  }
  
export default WelcomePage;