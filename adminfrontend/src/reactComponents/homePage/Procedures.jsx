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
    IconButton,
    TextField,
    DialogActions,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

export default function Procedures({ localText }) {
    // DataGrid rows
    const [rows, setRows] = useState([]);

    // Dialog states
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Delete confirmation dialog
    const [editDialogOpen, setEditDialogOpen] = useState(false);     // Edit procedure dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);       // Add procedure dialog

    // For deletion
    const [currentID, setCurrentID] = useState(0);
    const [procedureToDeleteName, setProcedureToDeleteName] = useState('');

    // For editing
    const [currentName, setCurrentName] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [currentDescription, setCurrentDescription] = useState('');

    // Fetch data
    const loadTable = () => {
        fetch(`${api}/admin-panel/attraction/getAll`, {
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
                const mapped = data.map((proc) => ({
                    id: proc.attractionId,
                    name: proc.name,
                    duration: proc.spotsAmount,
                    price: proc.levelOfExtreme,
                    description: proc.isPaid
                }));
                setRows(mapped);
            })
            .catch((error) => console.error('Error:', error));
    };

    useEffect(loadTable, []);

    // ---------------- DELETE LOGIC ----------------
    const handleDeleteClick = (params) => () => {
        setCurrentID(params.id);
        setProcedureToDeleteName(params.row.name);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    const handleDeleteConfirm = () => {
        fetch(`${api}/salon/procedure/delete/${currentID}`, {
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
            .catch((error) => console.error('Delete Error:', error));

        setOpenDeleteDialog(false);
    };

    // ---------------- EDIT LOGIC ----------------
    const handleEditClick = (params) => () => {
        setCurrentID(params.id);
        setCurrentName(params.row.name);
        setCurrentPrice(parseInt(params.row.price, 10) || 0);     // remove " zł"
        setCurrentDuration(parseInt(params.row.duration, 10) || 0); // remove " min"
        setCurrentDescription(params.row.description);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setCurrentID(0);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();

        const procedureEditData = {
            id: currentID,
            name: currentName,
            duration: currentDuration,
            price: currentPrice,
            description: currentDescription
        };

        fetch(`${api}/salon/procedure/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(procedureEditData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
            .catch((error) => console.error('Edit Error:', error));

        setEditDialogOpen(false);
        setCurrentID(0);
    };

    // ---------------- ADD LOGIC ----------------
    const handleAddDialogOpen = () => setOpenAddDialog(true);
    const handleAddDialogClose = () => setOpenAddDialog(false);

    const handleAddSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newName = formData.get('name');
        const newDuration = formData.get('duration');
        const newPrice = formData.get('price');
        const newDescription = formData.get('description');

        const procedureAddData = {
            name: newName,
            duration: newDuration,
            price: newPrice,
            description: newDescription
        };

        fetch(`${api}/salon/procedure/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(procedureAddData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                loadTable();
            })
            .catch((error) => console.error('Add Error:', error));

        setOpenAddDialog(false);
    };

    // DataGrid columns
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'duration', headerName: 'Duration', width: 200 },
        { field: 'price', headerName: 'Extreme level', width: 200 },
        { field: 'description', headerName: 'Is Paid', width: 200 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 110,
            cellClassName: 'actions',
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
            ]
        }
    ];

    return (
        <>
            {/* DELETE DIALOG */}
            <BootstrapDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="delete-procedure-dialog-title"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="delete-procedure-dialog-title">
                    Are you sure you want to delete this procedure?
                </DialogTitle>
                <DialogContent dividers>
                    {procedureToDeleteName}
                </DialogContent>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDeleteDialog}
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
                        autoFocus
                        variant="contained"
                        onClick={handleDeleteConfirm}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            {/* EDIT DIALOG */}
            <Dialog
                open={editDialogOpen}
                onClose={handleCloseEditDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleEditSubmit
                }}
            >
                <DialogTitle>Edit Procedure</DialogTitle>
                <DialogContent>
                    <div className="formVisit">
                        <div className="formVisitComponent">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                variant="outlined"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                value={currentName}
                                onChange={(e) => setCurrentName(e.target.value)}
                            />
                        </div>
                        <div className="formVisitComponent" style={{ marginTop: 3 }}>
                            <TextField
                                required
                                name="duration"
                                label="Duration (minutes)"
                                type="number"
                                value={currentDuration}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setCurrentDuration(e.target.value)}
                                sx={{ mr: 2 }}
                            />
                            <TextField
                                required
                                name="price"
                                label="Price"
                                type="number"
                                value={currentPrice}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                            />
                        </div>
                        <div className="formVisitComponent">
                            <TextField
                                required
                                margin="dense"
                                variant="outlined"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                value={currentDescription}
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* MAIN TABLE */}
            <div style={{ height: '60vh', width: '100%' }}>
                <DataGrid
                    loading={rows.length === 0}
                    rows={rows}
                    columns={columns}
                    localeText={localText}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        pagination: {
                            labelRowsPerPage: 'Rows per page'
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

            {/* ADD PROCEDURE BUTTON & DIALOG */}
            <div style={{ marginTop: '20px' }}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddDialogOpen}
                >
                    Add Procedure
                </Button>

                <Dialog
                    open={openAddDialog}
                    onClose={handleAddDialogClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleAddSubmit
                    }}
                >
                    <DialogTitle>Add Procedure</DialogTitle>
                    <DialogContent>
                        <div className="formVisit">
                            <div className="formVisitComponent">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    variant="outlined"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                />
                            </div>
                            <div className="formVisitComponent" style={{ marginTop: 3 }}>
                                <TextField
                                    required
                                    name="duration"
                                    label="Duration (minutes)"
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mr: 2 }}
                                />
                                <TextField
                                    required
                                    name="price"
                                    label="Price"
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className="formVisitComponent">
                                <TextField
                                    required
                                    margin="dense"
                                    variant="outlined"
                                    name="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddDialogClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
