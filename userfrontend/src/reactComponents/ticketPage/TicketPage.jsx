import React from "react";
import TopBar from "../generalComponents/TopBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, price, date, sth1, sth2) {
    return { name, price, date, sth1, sth2 };
}

const rows = [
    createData('Attraction1', 100, '01.01.2025', 'x', 'x'),
    createData('Attraction2', 50, '01.01.2025', 'x', 'x'),
    createData('Attraction3', 70, '01.01.2025', 'x', 'x'),
    createData('Attraction4', 100, '01.01.2025', 'x', 'x'),
    createData('Attraction5', 50, '01.01.2025', 'x', 'x'),
];

export default function TicketPage() {
    return (
        <div>
            <TopBar />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Attraction name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Sth</TableCell>
                            <TableCell align="right">Sth</TableCell>
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
                                <TableCell align="right">{row.sth1}</TableCell>
                                <TableCell align="right">{row.sth2}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
