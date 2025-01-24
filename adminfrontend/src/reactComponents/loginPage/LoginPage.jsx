import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Alert,
    Container,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import '../../../src/assets/css/index.css';

export default function LoginPage() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const api = `${API_BASE_URL}`;
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        const sanitizedLogin = DOMPurify.sanitize(login);
        const sanitizedPassword = DOMPurify.sanitize(password);

        if (!sanitizedLogin || !sanitizedPassword) {
            setAlertMessage("Please fill in all fields");
            setAlertType('warning');
            setShowAlert(true);
            return;
        }

        if (sanitizedLogin !== login || sanitizedPassword !== password) {
            setAlertMessage("Invalid characters in input fields");
            setAlertType('warning');
            setShowAlert(true);
            return;
        }

        const loginData = {
            email: sanitizedLogin,
            password: sanitizedPassword,
        };

        fetch(`${api}/admin-panel/authentication/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setAlertType('success');
                setAlertMessage("Login successful");
                setShowAlert(true);
                navigate('/');
                return response;
            })
            .then(() => {
                // Further processing if needed
            })
            .catch((error) => {
                setAlertMessage("Login failed");
                setAlertType('error');
                setShowAlert(true);
                console.error(error);
            });
    };

    return (
        <Container>
            <div className="loginBox">
                <Button
                    onClick={handleClickOpen}
                    sx={{
                        borderRadius: 100,
                        padding: 2,
                        position: 'absolute',
                        top: 10,
                        left: 10,
                    }}
                >
                    <HelpIcon fontSize="large" />
                </Button>


                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        {showAlert && (
                            <Alert severity={alertType} variant="outlined">
                                <b>{alertMessage}</b>
                            </Alert>
                        )}
                    </div>
                    <div className="textField">
                        <TextField
                            sx={{ opacity: 1 }}
                            required
                            type="email"
                            id="filled-required"
                            variant="filled"
                            label="Email"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="textField">
                        <TextField
                            sx={{ opacity: 1 }}
                            required
                            id="filled-password-input"
                            variant="filled"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submitButton">
                        <Button variant="contained" type="submit" size="large" onClick={handleClick}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </div>
        </Container>
    );
}
