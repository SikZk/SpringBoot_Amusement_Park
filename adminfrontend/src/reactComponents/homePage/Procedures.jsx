import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import { useEffect } from 'react';
import {API_BASE_URL} from "../../config/config";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {Dialog, Icon, styled} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const api = `${API_BASE_URL}`
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function Procedures(props) {
    const text = props.localText;
    const [t] = useTranslation('global');
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [currentID, setCurrentID] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [paramNameForDelete, setParamNameForDelete] = React.useState('');
    const [currentPrice, setCurrentPrice] = React.useState(0);
    const [currentDuration, setCurrentDuration] = React.useState(0);
    const [currentDescription, setCurrentDescription] = React.useState('');
    const [currentName, setCurrentName] = React.useState('');
    const handleEditClick = (params) => () => {
        setCurrentID(params.id);
        setCurrentPrice(parseInt(params.row.price.slice(0, -3)));
        setCurrentDuration(parseInt(params.row.duration.slice(0, -4)));
        setCurrentDescription(params.row.description);
        setCurrentName(params.row.name);
        setEditDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleEditDialogClose = () =>{
        setEditDialogOpen(false);
        setCurrentID(0);
    }
    const handleDeleteClick = (params) => () => {
        setParamNameForDelete(params.row.name);
        setCurrentID(params.id);
        setOpenDialog(true);
    }

    const handleDeleteClickDialog = () => {
        fetch(`${api}/salon/procedure/delete/${currentID}`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
        setOpenDialog(false);
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: "name", width: 200 },
        { field: 'duration', headerName: "duration", width: 200 },
        { field: 'price', headerName: "price", width: 200 },
        { field: 'description', headerName: "description", width: 200 },
        {
            field: 'actions',
            type: 'actions',
            headerName: "Actions",
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
        fetch(`${api}/admin-panel/attraction/getAll`,{
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
                const workerNames = data.map(procedure => ({ id: procedure.id, name: procedure.name, duration: procedure.duration+" min", price: procedure.price+" zł", description: procedure.description}));
                setRows(workerNames);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(loadTable, []);
    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t("SalonManager.deleteProcedureWarning")}
                </DialogTitle>
                <DialogContent>
                    {paramNameForDelete}
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

            <Dialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const procedureEditData = {name: currentName,duration: currentDuration, price: currentPrice, description: currentDescription,id:currentID};
                        fetch(`${api}/salon/procedure/update`,{
                            method: 'POST',
                            headers:{'Content-Type': 'application/json'},
                            credentials:'include',
                            body: JSON.stringify(procedureEditData)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                loadTable();
                                setCurrentID(0);
                                setEditDialogOpen(false);
                            })
                        handleEditDialogClose();
                    },
                }}
            >
                <DialogTitle>{t("SalonManager.editProcedure")}</DialogTitle>
                <DialogContent>
                    <div className="formVisit">
                        <div className="formVisitComponent">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="outlined-basic"
                                value={currentName}
                                variant="outlined"
                                name="name"
                                label={t("SalonManager.name")}
                                type="text"
                                fullWidth
                                onChange={(e) => setCurrentName(e.target.value)}
                            />
                        </div>
                        <div className="formVisitComponent" style={{marginTop: 3}}>
                            <TextField
                                required={true}
                                id="outlined-number"
                                value={currentDuration}
                                name="duration"
                                label={t("SalonManager.duration")}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setCurrentDuration(e.target.value)}
                            />

                            <TextField
                                required={true}
                                id="outlined-number"
                                name="price"
                                value={currentPrice}
                                label={t("SalonManager.price")}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                            />
                        </div>
                        <div className="formVisitComponent">
                            <TextField
                                autoFocus
                                required
                                value={currentDescription}
                                margin="dense"
                                id="outlined-basic"
                                variant="outlined"
                                name="description"
                                label={t("SalonManager.description")}
                                type="text"
                                fullWidth
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>{t("SalonManager.cancel")}</Button>
                    <Button type="submit">{t("SalonManager.editProcedure")}</Button>
                </DialogActions>
            </Dialog>
        <div>
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
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    pageSizeOptions={[10,25,100]}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </div>
            <div style={{marginTop:'20px'}}>
                    <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleClickOpen}>
                        {t("SalonManager.addProcedure")}
                    </Button>
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
                                const duration1 = formJson.duration;
                                const price1 = formJson.price;
                                const description1 = formJson.description;
                                console.log(formJson)
                                const procedureAddData = {name: name1,duration: duration1, price: price1, description: description1};
                                fetch(`${api}/salon/procedure/add`,{
                                    method: 'POST',
                                    headers:{'Content-Type': 'application/json'},
                                    credentials:'include',
                                    body: JSON.stringify(procedureAddData)
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error(`HTTP error! status: ${response.status}`);
                                        }
                                        loadTable();
                                        return response.json();
                                    })
                                    .then(data => {
                                    })
                                    .catch(error => {

                                    });
                                handleClose();
                            },
                        }}
                    >
                        <DialogTitle>{t("SalonManager.addProcedure")}</DialogTitle>
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
                                        label={t("SalonManager.name")}
                                        type="text"
                                        fullWidth
                                    />
                                </div>
                                <div className="formVisitComponent" style={{marginTop: 3}}>
                                    <TextField
                                        required={true}
                                        id="outlined-number"
                                        name="duration"
                                        label={t("SalonManager.duration")}
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        required={true}
                                        id="outlined-number"
                                        name="price"
                                        label={t("SalonManager.price")}
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
                            <Button type="submit">{t("SalonManager.addProcedure")}</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </React.Fragment>
    );
}