import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import TopBar from '../generalComponents/TopBar';
import { WEBSITE_PATH, API_BASE_URL } from '../../config/config';

export default function SettingsPage() {
    const [user, setUser] = useState(null);

    // Dialog states
    const [openChangeData, setOpenChangeData] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    // Example fields for "Change data" form:
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');

    // Example fields for "Change password" form:
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const backgroundImageUrl = `${WEBSITE_PATH}/img/mainSlider/amusementpark1.jpg`;
    const api = `${API_BASE_URL}`;

    // Fetch user data on mount
    useEffect(() => {
        fetch(`${api}/user-panel/clients/getMyAccountData`, {
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Adjust to match keys returned by your API
                setUser({
                    login: data.email,
                    firstName: data.name,
                    lastName: data.surname
                });
                setEditFirstName(data.name);   // prefill "change data" form
                setEditLastName(data.surname); // prefill "change data" form
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [api]);

    if (!user) {
        return (
            <div>
                <TopBar />
                <div style={{ textAlign: 'center', marginTop: '20vh' }}>
                    <Typography variant="h6">Loading user data...</Typography>
                </div>
            </div>
        );
    }

    // -------------- "Change data" dialog handlers --------------
    const handleOpenChangeData = () => {
        setOpenChangeData(true);
    };

    const handleCloseChangeData = () => {
        setOpenChangeData(false);
    };

    const handleSaveChangeData = (e) => {
        e.preventDefault();
        // Example request body
        const updatedData = {
            firstName: editFirstName,
            lastName: editLastName
        };
        // Example fetch call
        fetch(`${api}/user-panel/clients/updateMyData`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updatedData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Optionally refresh user or update local state
                setUser({
                    ...user,
                    firstName: data.name,
                    lastName: data.surname
                });
                setOpenChangeData(false);
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
            });
    };

    // -------------- "Change password" dialog handlers --------------
    const handleOpenChangePassword = () => {
        setOpenChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setOpenChangePassword(false);
    };

    const handleSaveChangePassword = (e) => {
        e.preventDefault();
        // Example request body
        const passwordData = {
            oldPassword,
            newPassword
        };
        // Example fetch call
        fetch(`${api}/user-panel/clients/updateMyPassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(passwordData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Could do additional steps here (e.g. show success message)
                setOpenChangePassword(false);
            })
            .catch((error) => {
                console.error('Error updating password:', error);
            });
    };

    return (
        <div>
            <TopBar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '90vh',
                    position: 'relative',
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        zIndex: 1
                    }}
                ></div>

                <Card
                    sx={{
                        width: 400,
                        boxShadow: 3,
                        borderRadius: 2,
                        padding: 2,
                        zIndex: 2,
                        backgroundColor: 'white'
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2
                            }}
                        >
                            {/* Avatar */}
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: '#1976d2',
                                    fontSize: 30
                                }}
                            >
                                {user.firstName[0]}
                                {user.lastName[0]}
                            </Avatar>

                            {/* User details */}
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Login: {user.login}
                            </Typography>

                            {/* Action Buttons */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    width: '100%',
                                    marginTop: 2
                                }}
                            >
                                <Button variant="contained" color="primary" fullWidth onClick={handleOpenChangeData}>
                                    Change data
                                </Button>
                                <Button variant="contained" color="primary" fullWidth onClick={handleOpenChangePassword}>
                                    Change password
                                </Button>
                                <Button variant="outlined" color="primary" fullWidth>
                                    Delete account
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </div>

            {/* DIALOG: CHANGE DATA */}
            <Dialog open={openChangeData} onClose={handleCloseChangeData}>
                <DialogTitle>Change Personal Data</DialogTitle>
                <Box
                    component="form"
                    onSubmit={handleSaveChangeData}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangeData}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            {/* DIALOG: CHANGE PASSWORD */}
            <Dialog open={openChangePassword} onClose={handleCloseChangePassword}>
                <DialogTitle>Change Password</DialogTitle>
                <Box
                    component="form"
                    onSubmit={handleSaveChangePassword}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Old Password"
                            type="password"
                            fullWidth
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangePassword}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
