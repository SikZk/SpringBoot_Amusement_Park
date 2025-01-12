import React from "react";
import TopBar from "../generalComponents/TopBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { WEBSITE_PATH } from "../../config/config";

function createData(name, price, date, type) {
    return { name, price, date, type };
}

const backgroundImageUrl = `${WEBSITE_PATH}/img/mainSlider/amusementpark1.jpg`;

const rows = [
    createData('Attraction1', 100, '01.01.2025', 'x'),
    createData('Attraction2', 50, '01.01.2025', 'x'),
    createData('Attraction3', 70, '01.01.2025', 'x'),
    createData('Attraction4', 100, '01.01.2025', 'x'),
    createData('Attraction5', 50, '01.01.2025', 'x'),
];

export default function TicketPage() {
    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay to create a foggy effect */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.4)", // White fog effect
                    zIndex: 1,
                }}
            ></div>

            <div style={{ position: "relative", zIndex: 2 }}>
                <TopBar />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
                    <TableContainer component={Paper} sx={{ width: "80%", maxWidth: "800px", opacity: 0.95 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Attraction name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}
