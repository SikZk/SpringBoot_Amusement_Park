import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import { useEffect } from 'react';
import {API_BASE_URL} from "../../config/config";
import {useTranslation} from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {Dialog} from "@mui/material";
import TextField from "@mui/material/TextField";
import { MuiColorInput } from 'mui-color-input'

const api = `${API_BASE_URL}`
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function Workers(props) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [paramsFromDelete, setParamsFromDelete] = React.useState({row: {}});
    const [nameAndSurname, setNameAndSurname] = React.useState('');
    const [color, setColor] = React.useState('');
    const [borderColor, setBorderColor] = React.useState('');
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [idToUpdate, setIdToUpdate] = React.useState(0);
    const handleEditClick = (params) => () => {
        setIdToUpdate(params.id);
        setNameAndSurname(params.row.lastName);
        setColor(params.row.color);
        setBorderColor(params.row.borderColor);
        setOpenEditDialog(true);

    }
    const handleEditClickSubmit = () => {
        setOpenDialog(false);
        const updateWorkerData ={
            firstAndLastName: nameAndSurname,
            color: color,
            borderColor: borderColor
        };
        fetch(`${api}/salon/worker/update/${idToUpdate}`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            credentials:'include',
            body: JSON.stringify(updateWorkerData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadTable();
            })
    }
    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    }
    const handleDeleteClick = (params) => () => {
        setParamsFromDelete(params);
        setOpenDialog(true);
    }
    const handleDeleteClickDialog = () => {
        setOpenDialog(false);
        fetch(`${api}/salon/worker/delete/${paramsFromDelete.id}`,{
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
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const text = props.localText;
    const [t] = useTranslation('global');
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'lastName', headerName: t("SalonManager.nameAndSurname"), width: 250 },
        { field: 'color', headerName: t("SalonManager.color"), width: 150 },
        { field: 'borderColor', headerName: t("SalonManager.borderColor"), width: 150 },
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
        fetch(`${api}/salon/worker/getWorkers`,{
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
                const workerNames = data.map(worker => ({ id: worker.id, lastName: worker.nameandsurname, color:worker.color,borderColor:worker.borderColor }));
                setRows(workerNames);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(loadTable, []);
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseEdit}
                aria-labelledby="customized-dialog-title"
                open={openEditDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t("SalonManager.updateWorker")}
                </DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="outlined-basic"
                        variant="outlined"
                        name="name"
                        value={nameAndSurname}
                        label={t("SalonManager.nameAndSurnameWorker")}
                        type="text"
                        fullWidth
                        onChange={(e) => setNameAndSurname(e.target.value)}
                        sx={{marginBottom: '20px'}}
                    />
                    <MuiColorInput
                        format="hex"
                        label={t("SalonManager.color")}
                        value={color}
                        onChange={(newValue) => setColor(newValue)}
                        sx={{width: '49%'}}
                    />
                    <MuiColorInput
                        format="hex"
                        label={t("SalonManager.borderColor")}
                        value={borderColor}
                        onChange={(newValue) => setBorderColor(newValue)}
                        sx={{width: '49%', marginLeft: '2%'}}
                    />
                </DialogContent>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseEdit}
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
                    <Button autoFocus onClick={handleEditClickSubmit}>
                        {t("SalonManager.submit")}
                    </Button>
                </DialogActions>
            </BootstrapDialog>



            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t("SalonManager.deleteWorkerWarning")}
                </DialogTitle>
                <DialogContent>
                    {paramsFromDelete.row.lastName}
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
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}

                    pageSizeOptions={[10,25,100]}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </div>
        </React.Fragment>
    );
}