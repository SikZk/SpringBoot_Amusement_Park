import React, { useEffect, useState } from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbar
} from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '../../config/config';

const api = `${API_BASE_URL}`;

const drawerStyles = ({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
});

const BootstrapDialog = styled(Dialog)(drawerStyles);

export default function Clients(props) {
    const { localText } = props;

    // DataGrid rows
    const [rows, setRows] = useState([]);

    // Dialog states
    const [openAdd, setOpenAdd] = useState(false); // Add-client dialog
    const [openEdit, setOpenEdit] = useState(false); // Edit-client dialog
    const [openDelete, setOpenDelete] = useState(false); // Delete confirmation dialog

    // For deleting a client
    const [paramsFromDelete, setParamsFromDelete] = useState({ row: {} });

    // For editing a client
    const [idToUpdate, setIdToUpdate] = useState(0);
    const [editName, setEditName] = useState('');
    const [editSurname, setEditSurname] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState('');
    const [editSex, setEditSex] = useState('M');
    const [editAccountCreationDate, setEditAccountCreationDate] = useState('');

    // For adding a client
    const [addName, setAddName] = useState('');
    const [addSurname, setAddSurname] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addPhoneNumber, setAddPhoneNumber] = useState('');
    const [addSex, setAddSex] = useState('M');
    const [addPassword, setAddPassword] = useState('');

    // Load table data
    const loadTable = () => {
        fetch(`${api}/admin-panel/client/getAll`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const mappedData = data.map((client) => ({
                    id: client.clientId,
                    name: client.name,
                    surname: client.surname,
                    email: client.email,
                    phoneNumber: client.phoneNumber,
                    sex: client.sex,
                    accountCreationDate: client.accountCreationDate,
                    role: client.role
                }));
                setRows(mappedData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(loadTable, []);

    // ---------- Delete Client Logic ----------
    const handleDeleteOpen = () => setOpenDelete(true);
    const handleDeleteClose = () => setOpenDelete(false);

    const handleDeleteClick = (params) => () => {
        setParamsFromDelete(params);
        handleDeleteOpen();
    };

    const handleDeleteConfirm = () => {
        setOpenDelete(false);
        fetch(`${api}/admin-panel/client/delete/${paramsFromDelete.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
            .catch((error) => {
                console.error('Delete Error:', error);
            });
    };

    // ---------- Add Client Logic ----------
    const handleAddOpen = () => setOpenAdd(true);
    const handleAddClose = () => setOpenAdd(false);

    const handleAddSubmit = (e) => {
        e.preventDefault();

        const newClient = {
            name: addName,
            surname: addSurname,
            email: addEmail,
            phoneNumber: addPhoneNumber,
            sex: addSex,
            password: addPassword
        };

        fetch(`${api}/admin-panel/client/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newClient)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
            .catch((error) => console.error('Add Error:', error));

        // Reset fields & close dialog
        setAddName('');
        setAddSurname('');
        setAddEmail('');
        setAddPhoneNumber('');
        setAddSex('M');
        setAddPassword('');

        handleAddClose();
    };

    // ---------- Edit Client Logic ----------
    const handleEditOpen = () => setOpenEdit(true);
    const handleEditClose = () => setOpenEdit(false);

    const handleEditClick = (params) => () => {
        setIdToUpdate(params.id);

        setEditName(params.row.name || '');
        setEditSurname(params.row.surname || '');
        setEditEmail(params.row.email || '');
        setEditPhoneNumber(params.row.phoneNumber || '');
        setEditSex(params.row.sex || 'M');
        setEditAccountCreationDate(params.row.accountCreationDate || '');

        handleEditOpen();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const updatedClient = {
            name: editName,
            surname: editSurname,
            email: editEmail,
            phoneNumber: editPhoneNumber,
            sex: editSex,
            accountCreationDate: editAccountCreationDate
        };

        fetch(`${api}/admin-panel/client/update/${idToUpdate}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updatedClient)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
            .catch((error) => console.error('Update Error:', error));

        handleEditClose();
    };

    // ---------- DataGrid columns ----------
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'sex', headerName: 'Sex', width: 70 },
        { field: 'phoneNumber', headerName: 'Phone', width: 110 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'surname', headerName: 'Surname', width: 130 },
        { field: 'accountCreationDate', headerName: 'Created On', width: 130 },
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'role', headerName: 'Role', width: 100 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 110,
            cellClassName: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    sx={{ color: 'primary.main' }}
                    onClick={handleEditClick(params)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    sx={{ color: 'error.main' }}
                    onClick={handleDeleteClick(params)}
                />
            ]
        }
    ];

    return (
        <>
            {/* DELETE CONFIRMATION DIALOG */}
            <BootstrapDialog
                onClose={handleDeleteClose}
                open={openDelete}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Are you sure you want to delete this client?
                </DialogTitle>

                <DialogContent dividers>
                    {paramsFromDelete.row.email}
                </DialogContent>

                <IconButton
                    aria-label="close"
                    onClick={handleDeleteClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleDeleteConfirm}
                        sx={{ color: 'white', backgroundColor: 'error.main' }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            {/* DATA GRID */}
            <div style={{ height: '60vh', width: '100%' }}>
                <DataGrid
                    loading={rows.length === 0}
                    rows={rows}
                    columns={columns}
                    localeText={localText}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        pagination: {
                            labelRowsPerPage: 'rows per page'
                        }
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25 }
                        }
                    }}
                    pageSizeOptions={[10, 25, 100]}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                {/* ADD CLIENT BUTTON */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddOpen}
                    sx={{ color: 'white', backgroundColor: 'primary.main' }}
                >
                    Add client
                </Button>
            </div>

            {/* ADD CLIENT DIALOG */}
            <Dialog open={openAdd} onClose={handleAddClose}>
                <DialogTitle>Add Client</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleAddClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <form id="add-client-form" onSubmit={handleAddSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Name"
                            variant="outlined"
                            value={addName}
                            onChange={(e) => setAddName(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Surname"
                            variant="outlined"
                            value={addSurname}
                            onChange={(e) => setAddSurname(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={addEmail}
                            onChange={(e) => setAddEmail(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Phone Number"
                            type="tel"
                            variant="outlined"
                            value={addPhoneNumber}
                            onChange={(e) => setAddPhoneNumber(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Sex</InputLabel>
                            <Select
                                value={addSex}
                                label="Sex"
                                onChange={(e) => setAddSex(e.target.value)}
                            >
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="F">F</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            required
                            margin="dense"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={addPassword}
                            onChange={(e) => setAddPassword(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button
                        form="add-client-form"
                        type="submit"
                        variant="contained"
                        sx={{ color: 'white', backgroundColor: 'primary.main' }}
                    >
                        Add Client
                    </Button>
                </DialogActions>
            </Dialog>

            {/* EDIT CLIENT DIALOG */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Client</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleEditClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <form id="edit-client-form" onSubmit={handleEditSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Name"
                            variant="outlined"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Surname"
                            variant="outlined"
                            value={editSurname}
                            onChange={(e) => setEditSurname(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Phone Number"
                            type="tel"
                            variant="outlined"
                            value={editPhoneNumber}
                            onChange={(e) => setEditPhoneNumber(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Sex</InputLabel>
                            <Select
                                value={editSex}
                                label="Sex"
                                onChange={(e) => setEditSex(e.target.value)}
                            >
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="F">F</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            required
                            margin="dense"
                            label="Account Creation Date"
                            type="date"
                            variant="outlined"
                            value={editAccountCreationDate}
                            onChange={(e) => setEditAccountCreationDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                        form="edit-client-form"
                        type="submit"
                        variant="contained"
                        sx={{ color: 'white', backgroundColor: 'primary.main' }}
                    >
                        Update Client
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
