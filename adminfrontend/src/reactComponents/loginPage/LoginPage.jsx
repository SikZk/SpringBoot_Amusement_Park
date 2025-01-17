import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../src/assets/css/index.css';
import {useTranslation} from "react-i18next";
import {Alert, Container, Dialog, DialogContent, DialogTitle, IconButton, styled, Typography} from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import {useState} from "react";
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../config/config';

export default function LoginPage() {
    const [t] = useTranslation('global');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    const[showAlert, setShowAlert] = useState(false);
    const[alertType,setAlertType] = useState('');
    const[alertMessage, setAlertMessage] = useState('');
    const[login, setLogin] = useState('');
    const[password, setPassword] = useState('');
    const api = `${API_BASE_URL}`
    const navigate = useNavigate();
    const handleClick =(e)=>{
        e.preventDefault()
        const sanitizedLogin = DOMPurify.sanitize(login);
        const sanitizedPassword = DOMPurify.sanitize(password);
        if (!sanitizedPassword || !sanitizedLogin) {
            setAlertMessage(t("loginForm.warningMessage"));
            setAlertType('warning');
            setShowAlert(true);
            return;
        }
        if(sanitizedLogin!==login || sanitizedPassword!==password){
            setAlertMessage(t("loginForm.sanitizeDataMessage"));
            setAlertType('warning');
            setShowAlert(true);
            return;
        }
        const loginData = {email:sanitizedLogin,password:sanitizedPassword}
        fetch(`${api}/admin-panel/authentication/login`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(loginData),
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setAlertType('success')
                setAlertMessage(t("loginForm.successMessage"))
                setShowAlert(true);
                navigate('/')
                return response
            })
            .then(data => {
            })
            .catch(error => {
                setAlertMessage(t("loginForm.errorMessage"))
                console.log(error)
                setAlertType('error')
                setShowAlert(true);
            });
    }
    // noinspection JSCheckFunctionSignatures
    return (
        <Container>
            <div className="loginBox">
                <Button
                    onClick={handleClickOpen}
                    sx={{
                        borderRadius: 100,
                        padding: 2,
                        position: 'absolute', // Set position to absolute
                        top: 10, // Set top to 0
                        left: 10, // Set left to 0
                    }}
                >
                    <HelpIcon fontSize="large" />
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {t("loginForm.resetPasswordInfoHeader")}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            {t("loginForm.resetPasswordInfoBody")}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            {t("loginForm.resetPassword")}
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        {showAlert &&
                            <Alert severity={alertType}
                                   variant="outlined"
                            ><b>{alertMessage}</b></Alert>
                        }
                    </div>
                    <div className="textField">
                        <TextField
                            sx={{
                                opacity:'1',
                            }}
                            required
                            type="email"
                            id="filled-required"
                            variant="filled"
                            label={"Email"}
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="textField">
                        <TextField
                            sx={{
                                opacity:'1',
                            }}
                            required
                            id="filled-password-input"
                            variant="filled"
                            label={"Password"}
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submitButton">
                        <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            onClick={handleClick}
                        >
                            {"submit"}
                        </Button>
                    </div>
                </Box>
            </div>
        </Container>
    );
}