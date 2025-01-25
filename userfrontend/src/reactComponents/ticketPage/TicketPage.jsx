import React, { useState, useEffect } from "react";
import TopBar from "../generalComponents/TopBar";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { WEBSITE_PATH } from "../../config/config";

const backgroundImageUrl = `${WEBSITE_PATH}/img/mainSlider/amusementpark1.jpg`;

export default function TicketPage() {
    const [rows, setRows] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [qrLink, setQrLink] = useState("");

    useEffect(() => {
        // Fetch user tickets
        fetch("http://localhost:8080/api/v1/user-panel/tickets/getMyTickets", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const mappedData = data.map((ticket) => ({
                    date: ticket.ticketDate,
                    type: ticket.type,
                }));
                setRows(mappedData);
            })
            .catch((error) => console.error("Error fetching tickets:", error));

        // Fetch QR link
        fetch("http://localhost:8080/api/v1/user-panel/clients/getMyLink", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.text();
            })
            .then((link) =>
                setQrLink(
                    `http://localhost:8080/api/v1/user-panel/clients/submitLink?link=${link}`
                )
            )
            .catch((error) => console.error("Error fetching QR code link:", error));
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay for foggy effect */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    zIndex: 1,
                }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
                <TopBar />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "70vh",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{ width: "80%", maxWidth: "800px", opacity: 0.95 }}
                    >
                        <Table aria-label="tickets table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Attraction name</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <Button
                        variant="contained"
                        onClick={handleOpenDialog}
                        sx={{ marginBottom: "20px" }}
                    >
                        Show QR Code
                    </Button>
                </div>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>QR Code</DialogTitle>
                    <DialogContent style={{ textAlign: "center" }}>
                        <QRCodeCanvas value={qrLink} size={256} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
