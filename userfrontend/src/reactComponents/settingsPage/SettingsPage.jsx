import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Button } from "@mui/material";
import TopBar from "../generalComponents/TopBar";
import { WEBSITE_PATH } from "../../config/config";

export default function SettingsPage() {
    const user = {
        login: "johndoe123",
        firstName: "John",
        lastName: "Doe",
    };

    const backgroundImageUrl = `${WEBSITE_PATH}/img/mainSlider/amusementpark1.jpg`;

    return (
        <div>
            <TopBar />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "90vh",
                    position: "relative",
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Background overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.4)", // Lekki ciemny overlay
                        zIndex: 1,
                    }}
                ></div>

                {/* Card with data */}
                <Card
                    sx={{
                        width: 400,
                        boxShadow: 3,
                        borderRadius: 2,
                        padding: 2,
                        zIndex: 2,
                        backgroundColor: "white",
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {/* Avatar */}
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: "#1976d2",
                                    fontSize: 30,
                                }}
                            >
                                {user.firstName[0]}{user.lastName[0]}
                            </Avatar>

                            {/* User details */}
                            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Login: {user.login}
                            </Typography>

                            {/* Buttons */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", marginTop: 2 }}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Zmień dane
                                </Button>
                                <Button variant="contained" color="primary" fullWidth>
                                    Zmień hasło
                                </Button>
                                <Button variant="outlined" color="primary" fullWidth>
                                    Usuń konto
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
