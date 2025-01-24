import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbar
} from '@mui/x-data-grid';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { API_BASE_URL } from '../../config/config';

const api = `${API_BASE_URL}`;

// Styled MUI Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

export default function Workers(props) {
    const { localText } = props;

    // Table data
    const [rows, setRows] = useState([]);

    // Dialog states
    const [openDialog, setOpenDialog] = useState(false);      // For delete confirmation
    const [openEditDialog, setOpenEditDialog] = useState(false); // For editing a worker

    // Row params for the worker to be deleted
    const [paramsFromDelete, setParamsFromDelete] = useState({ row: {} });

    // Fields for editing a worker
    const [idToUpdate, setIdToUpdate] = useState(0);
    const [editName, setEditName] = useState('');
    const [editSurname, setEditSurname] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPesel, setEditPesel] = useState('');
    const [editIdNumber, setEditIdNumber] = useState('');
    const [editSex, setEditSex] = useState('M');
    const [editBankAccountNumber, setEditBankAccountNumber] = useState('');
    const [editDateOfBirth, setEditDateOfBirth] = useState('');

    // Fetch and load table data
    const loadTable = () => {
        fetch(`${api}/admin-panel/worker/getAll`, {
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
                const workerRows = data.map((worker) => ({
                    id: worker.id,
                    name: worker.name,
                    surname: worker.surname,
                    dateOfBirth: worker.dateOfBirth,
                    pesel: worker.pesel,
                    sex: worker.sex,
                    idNumber: worker.idNumber,
                    employmentDate: worker.employmentDate,
                    email: worker.email,
                    bankAccountNumber: worker.bankAccountNumber,
                    phoneNumber: worker.phoneNumber,
                    salary: worker.salary
                }));
                setRows(workerRows);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(loadTable, []);

    // ---- DELETE DIALOG LOGIC ----
    const handleDeleteClick = (params) => () => {
        setParamsFromDelete(params);
        setOpenDialog(true);
    };

    const handleDeleteClickDialog = () => {
        setOpenDialog(false);
        fetch(`${api}/admin-panel/workers/delete/${paramsFromDelete.id}`, {
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
            .catch((err) => console.error('Delete Error:', err));
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // ---- EDIT DIALOG LOGIC ----
    const handleEditClick = (params) => () => {
        setIdToUpdate(params.id);
        setEditName(params.row.name || '');
        setEditSurname(params.row.surname || '');
        setEditEmail(params.row.email || '');
        setEditPesel(params.row.pesel || '');
        setEditIdNumber(params.row.idNumber || '');
        setEditSex(params.row.sex || 'M');
        setEditBankAccountNumber(params.row.bankAccountNumber || '');
        setEditDateOfBirth(params.row.dateOfBirth || '');

        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    // Submitting updated fields
    const handleSubmitEdit = () => {
        const updateData = {
            name: editName,
            surname: editSurname,
            email: editEmail,
            pesel: editPesel,
            idNumber: editIdNumber,
            sex: editSex,
            bankAccountNumber: editBankAccountNumber,
            dateOfBirth: editDateOfBirth
        };

        fetch(`${api}/admin-panel/worker/update/${idToUpdate}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updateData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
                setOpenEditDialog(false);
            })
            .catch((err) => console.error('Edit Error:', err));
    };

    // DataGrid columns
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'surname', headerName: 'Surname', width: 130 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'pesel', headerName: 'PESEL', width: 130 },
        { field: 'idNumber', headerName: 'ID Number', width: 120 },
        { field: 'sex', headerName: 'Sex', width: 100 },
        { field: 'bankAccountNumber', headerName: 'Bank Account', width: 170 },
        { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130 },
        { field: 'employmentDate', headerName: 'Employment Date', width: 130 },
        { field: 'phoneNumber', headerName: 'Phone', width: 120 },
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
            {/* EDIT DIALOG */}
            <BootstrapDialog
                onClose={handleCloseEdit}
                aria-labelledby="customized-dialog-title"
                open={openEditDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Worker
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseEdit}
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
                    <TextField
                        label="Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Surname"
                        value={editSurname}
                        onChange={(e) => setEditSurname(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="PESEL"
                        value={editPesel}
                        onChange={(e) => setEditPesel(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="ID Number"
                        value={editIdNumber}
                        onChange={(e) => setEditIdNumber(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    {/* Sex Select */}
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
                        label="Bank Account Number"
                        value={editBankAccountNumber}
                        onChange={(e) => setEditBankAccountNumber(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    {/* Date of Birth (type="date") */}
                    <TextField
                        label="Date of Birth"
                        type="date"
                        value={editDateOfBirth}
                        onChange={(e) => setEditDateOfBirth(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleSubmitEdit}
                        sx={{ color: 'white', backgroundColor: 'primary.main' }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            {/* DELETE DIALOG */}
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Are you sure you want to delete this worker?
                </DialogTitle>
                <DialogContent dividers>
                    {paramsFromDelete.row.email}
                </DialogContent>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
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
                        onClick={handleDeleteClickDialog}
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
                            paginationModel: { page: 0, pageSize: 10 }
                        }
                    }}
                    pageSizeOptions={[10, 25, 100]}
                />
            </div>
        </>
    );
}
