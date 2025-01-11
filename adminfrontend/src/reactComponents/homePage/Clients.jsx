import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import {API_BASE_URL} from "../../config/config";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Dialog} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";

const api = `${API_BASE_URL}`
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function Clients(props) {
    const [t] = useTranslation('global');
    const text = props.localText;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [openDialog, setOpenDialog] = React.useState(false);
    const [paramsFromDelete, setParamsFromDelete] = React.useState({row: {}});

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleDeleteClick = (params) => () => {
        setParamsFromDelete(params);
        setOpenDialog(true);
    }
    const handleDeleteClickDialog = () => {
        setOpenDialog(false);
        fetch(`${api}/salon/client/delete/${paramsFromDelete.id}`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
    }
    const[openEdit,setOpenEdit] = useState(false);
    const [name1, setName1] = useState('');
    const [phoneNumber1, setPhoneNumber1] = useState('');
    const [email1, setEmail1] = useState('');
    const [description1, setDescription1] = useState('');
    const [idToUpdate, setIdToUpdate] = React.useState(0);
    const handleCloseEdit = () => () => {
        setOpenEdit(false);
    }
    const handleEditClick = (params) => () => {
        setIdToUpdate(params.id);
        setName1(params.row.lastName);
        setPhoneNumber1(params.row.phoneNumber);
        setEmail1(params.row.email);
        setDescription1(params.row.comment);
        setOpenEdit(true);
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'lastName', headerName: t("SalonManager.nameAndSurname"), width: 200 },
        { field: 'phoneNumber', headerName: t("SalonManager.phoneNumber"), width: 200 },
        { field: 'email', headerName: t("SalonManager.email"), width: 200 },
        { field: 'comment', headerName: t("SalonManager.comment"), width: 200 },
        {
            field: 'actions',
            type: 'actions',
            headerName: t("SalonManager.actions"),
            width: 110,
            cellClassName: 'actions',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="edit"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={() => handleEditClick(params)()}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="delete"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={() => handleDeleteClick(params)()}
                    />,
                ];
            },
        },
    ];

    const [rows, setRows] = React.useState([]);

    const loadTable = () => {
        fetch(`${api}/salon/client/getAllClients`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const clientNames = data.map(client => ({ id: client.id, lastName: client.nameandsurname,phoneNumber:client.phoneNumber,email:client.email,comment:client.comment}));
                setRows(clientNames);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(loadTable, []);
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t("SalonManager.deleteClientWarning")}
                </DialogTitle>
                <DialogContent>
                        {paramsFromDelete.row.email}
                </DialogContent>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogActions>
                    <Button autoFocus onClick={handleDeleteClickDialog}>
                        {t("SalonManager.submit")}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div style={{height: '60vh', width: '100%'}}>
                <DataGrid
                    loading={rows.length === 0}
                    rows={rows}
                    columns={columns}
                    localeText={text}
                    slotProps={{ pagination: {
                            labelRowsPerPage: t("SalonManager.rowsPerPage"),
                        } }}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 25},
                        },
                    }}
                    pageSizeOptions={[10, 25,100]}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </div>
            <div style={{marginTop: '20px'}}>
                <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleClickOpen}>
                    {t("SalonManager.addClient")}
                </Button>

                <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const procedureAddData = {
                                firstAndLastName: name1,
                                phoneNumber: phoneNumber1,
                                email: email1,
                                comment: description1
                            };
                            fetch(`${api}/salon/client/update/${idToUpdate}`, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                credentials: 'include',
                                body: JSON.stringify(procedureAddData)
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    loadTable();
                                })
                            handleCloseEdit();
                            setOpenEdit(false);
                        },
                    }}
                >
                    <DialogTitle>{t("SalonManager.updateClient")}</DialogTitle>
                    <DialogContent>
                        <div className="formVisit">
                            <div className="formVisitComponent">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="name"
                                    value={name1}
                                    label={t("SalonManager.clientName")}
                                    type="text"
                                    fullWidth
                                    onChange={(e) => setName1(e.target.value)}
                                />
                            </div>
                            <div className="formVisitComponent" style={{marginTop: 3}}>
                                <TextField
                                    required={true}
                                    id="outlined-number"
                                    name="email"
                                    value={email1}
                                    label={t("SalonManager.email")}
                                    type="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setEmail1(e.target.value)}
                                />

                                <TextField
                                    required={true}
                                    id="outlined-number"
                                    name="phoneNumber"
                                    value={phoneNumber1}
                                    label={t("SalonManager.phoneNumber")}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setPhoneNumber1(e.target.value)}
                                />
                            </div>
                            <div className="formVisitComponent">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="outlined-basic"
                                    value={description1}
                                    variant="outlined"
                                    name="description"
                                    label={t("SalonManager.description")}
                                    type="text"
                                    fullWidth
                                    onChange={(e) => setDescription1(e.target.value)}
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit()}>{t("SalonManager.cancel")}</Button>
                        <Button type="submit">{t("SalonManager.addClient")}</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const name1 = formJson.name;
                            const phoneNumber1 = formJson.phoneNumber;
                            const email1 = formJson.email;
                            const description1 = formJson.description;
                            const procedureAddData = {
                                firstAndLastName: name1,
                                phoneNumber: phoneNumber1,
                                email: email1,
                                comment: description1
                            };
                            fetch(`${api}/salon/client/add`, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                credentials: 'include',
                                body: JSON.stringify(procedureAddData)
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    loadTable();
                                    return response.json();
                                })
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>{t("SalonManager.addClient")}</DialogTitle>
                    <DialogContent>
                        <div className="formVisit">
                            <div className="formVisitComponent">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="name"
                                    label={t("SalonManager.clientName")}
                                    type="text"
                                    fullWidth
                                />
                            </div>
                            <div className="formVisitComponent" style={{marginTop: 3}}>
                                <TextField
                                    required={true}
                                    id="outlined-number"
                                    name="email"
                                    label={t("SalonManager.email")}
                                    type="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    required={true}
                                    id="outlined-number"
                                    name="phoneNumber"
                                    label={t("SalonManager.phoneNumber")}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="formVisitComponent">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="description"
                                    label={t("SalonManager.description")}
                                    type="text"
                                    fullWidth
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{t("SalonManager.cancel")}</Button>
                        <Button type="submit">{t("SalonManager.addClient")}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );
}