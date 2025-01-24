import * as React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    TextField,
    Alert,
} from '@mui/material';
import {
    DataGrid,
    GridToolbar,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../config/config';

// Minimal "Tickets" page
export default function TicketsPage(props) {
    const [t] = useTranslation('global');
    const { localText } = props;

    // State for your DataGrid rows
    const [rows, setRows] = useState([]);

    // States for delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(null);

    // States for edit dialog
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [ticketId, setTicketId] = useState(null);
    const [ticketDate, setTicketDate] = useState(null);
    const [ticketType, setTicketType] = useState('');

    // Optional for showing alerts
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessageType, setAlertMessageType] = useState('success');

    const api = `${API_BASE_URL}`;

    // Load table data
    const loadTable = () => {
        fetch(`${api}/admin-panel/tickets/getAll`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('Error fetching tickets:', response);
                }
                return response.json();
            })
            .then((data) => {
                const mappedData = data.map((ticket) => ({
                    id: ticket.ticketId,
                    clientName: ticket.client?.name || '',
                    clientEmail: ticket.client?.email || '',
                    date: ticket.ticketDate,
                    type: ticket.type,
                }));
                setRows(mappedData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(loadTable, []);

    // ---- DELETE LOGIC ----
    const handleDeleteClick = (params) => () => {
        setTicketToDelete(params.row);
        setDeleteDialogOpen(true);
    };

    const deleteTicket = () => {
        if (!ticketToDelete) return;

        // Example: you might call an endpoint like /admin-panel/tickets/delete/{id}
        fetch(`${api}/admin-panel/tickets/delete/${ticketToDelete.id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    setAlertMessage('Error deleting ticket');
                    setAlertMessageType('error');
                } else {
                    setAlertMessage('Ticket deleted successfully');
                    setAlertMessageType('success');
                }
                setShowAlert(true);
                loadTable();
                setDeleteDialogOpen(false);
            })
            .catch((err) => console.error('Delete Error:', err));
    };

    // ---- EDIT LOGIC ----
    const handleEditClick = (params) => () => {
        // Fill form with existing ticket data
        setTicketId(params.row.id);
        setTicketDate(dayjs(params.row.date)); // dayjs parse
        setTicketType(params.row.type || '');

        setEditDialogOpen(true);
    };

    const updateTicket = () => {
        // Example payload with updated fields
        const payload = {
            ticketId,
            ticketDate: ticketDate ? ticketDate.format('YYYY-MM-DD') : null,
            type: ticketType,
        };

        // Example endpoint for updating a ticket
        fetch(`${api}/admin-panel/tickets/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) {
                    setAlertMessage('Error updating ticket');
                    setAlertMessageType('error');
                } else {
                    setAlertMessage('Ticket updated successfully');
                    setAlertMessageType('success');
                }
                setShowAlert(true);
                loadTable();
                setEditDialogOpen(false);
            })
            .catch((err) => console.error('Update Error:', err));
    };

    // DataGrid columns
    const columns = [
        { field: 'id', headerName: 'Ticket ID', width: 100 },
        { field: 'clientName', headerName: 'Client name', width: 200 },
        { field: 'clientEmail', headerName: 'Client email', width: 220 },
        { field: 'date', headerName: 'Ticket date', width: 150 },
        { field: 'type', headerName: 'Ticket type', width: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="edit"
                    sx={{ color: 'primary.main' }} // "primary" color for edit
                    onClick={() => handleEditClick(params)()}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="delete"
                    sx={{ color: 'error.main' }} // "error" color for delete
                    onClick={() => handleDeleteClick(params)()}
                />
            ],
        },
    ];

    return (
        <>
            <div style={{ height: '60vh', width: '100%' }}>
                {showAlert && (
                    <Alert severity={alertMessageType} variant="outlined">
                        <b>{alertMessage}</b>
                    </Alert>
                )}

                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={rows.length === 0}
                    localeText={localText}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        pagination: { labelRowsPerPage: 'Rows per page' },
                    }}
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 100]}
                />
            </div>

            {/* DELETE DIALOG */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete this ticket?</DialogTitle>
                {ticketToDelete && (
                    <p style={{ padding: '0 24px' }}>
                        You are deleting Ticket #{ticketToDelete.id} for{' '}
                        {ticketToDelete.clientName}.
                    </p>
                )}
                <div style={{ display: 'flex', gap: '1rem', padding: '0 24px 24px' }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteTicket}
                    >
                        Confirm
                    </Button>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                </div>
            </Dialog>

            {/* EDIT DIALOG */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Ticket</DialogTitle>
                <div style={{ padding: '0 24px 24px' }}>
                    <FormControl sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <TextField
                            label="Ticket Type"
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value)}
                        />
                        {/* If you want to let user choose date with dayjs, do so: */}
                        <TextField
                            label="Ticket Date"
                            value={ticketDate ? ticketDate.format('YYYY-MM-DD') : ''}
                            onChange={(e) => setTicketDate(dayjs(e.target.value))}
                        />
                    </FormControl>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Button
                            variant="contained"
                            onClick={updateTicket}
                        >
                            Save
                        </Button>
                        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
