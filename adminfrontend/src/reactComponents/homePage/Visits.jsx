import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import { useEffect } from 'react';
import {API_BASE_URL} from "../../config/config";
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import {
    GridActionsCellItem,
} from '@mui/x-data-grid';
import FormControl from "@mui/material/FormControl";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import dayjs from 'dayjs';
import DOMPurify from "dompurify";
import {Alert} from "@mui/material";
export default function Visits(props) {
    const [showAlert, setShowAlert]= React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertMessageType, setAlertMessageType] = React.useState('success');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [checkDialogOpen, setCheckDialogOpen] = React.useState(false);
    const [deleteComment, setDeleteComment] = React.useState('');
    const [checkComment, setCheckComment] = React.useState('');
    const [currentID, setCurrentID] = React.useState(0);
    const [worker, setWorker] = React.useState([]);
    const [client1, setClient1] = React.useState([]);
    const [procedure1, setProcedure1] = React.useState([]);
    const rooms = ["0","1","2","3","4","5"];
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);
    const [room, setRoom] = React.useState('');
    const [procedure, setProcedure] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [duration, setDuration] = React.useState('')
    const[comment, setComment] = React.useState('')
    const [worker1, setWorker1] = React.useState('')
    const [client, setClient] = React.useState('')
    const[visitDate, setVisitDate] = React.useState('')
    const [visitTime, setVisitTime] = React.useState('')
    const addVisitForm =(e)=>{
        if ((procedure==="") || (duration==="") || (worker1==="") || (client==="") || (visitDate==="") || (visitTime==="")) {
            return; // Return early from the function
        }
        setOpen(false);
        let day = visitDate.date(); // gets the day of the month
        let month = visitDate.month() + 1; // gets the month (0-11, hence the +1)
        let year = visitDate.year(); // gets the year
        const sanitizedWorker1 = DOMPurify.sanitize(worker1);
        const sanitizedClient = DOMPurify.sanitize(client);
        const sanitizedProcedure = DOMPurify.sanitize(procedure);
        const sanitizedPrice = DOMPurify.sanitize(price);
        const sanitizedDuration = DOMPurify.sanitize(duration);
        const sanitizedRoom = DOMPurify.sanitize(room);
        const sanitizedComment = DOMPurify.sanitize(comment);
        let date = `${year}-${month}-${day}`;
        let time = dayjs(visitTime).format('HH:mm');
        const visitAddData = {id: currentID, date:date, time:time, workerNameAndSurname:sanitizedWorker1, clientFirstAndLastName:sanitizedClient, procedureName:sanitizedProcedure, price:sanitizedPrice, duration:sanitizedDuration, room:sanitizedRoom, comment:sanitizedComment}
        console.log(visitAddData);
        fetch(`${api}/salon/visit/update`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(visitAddData),
            credentials:'include'
        })
            .then(response => {
                loadTable();
                if (!response.ok) {
                    console.log(response);
                }
            })
    }
    const[idToDelete, setIdToDelete] = React.useState(0);
    const[idToCheck, setIdToCheck] = React.useState(0);
    const handleDeleteClick = (params) => () =>{
        setIdToDelete(params.id);
        setDeleteDialogOpen(true);
    }
    const handleCheckClick = (params) => () =>{
        setIdToCheck(params.id);
        setCheckDialogOpen(true);
    }
    const checkVisit = () => {
        fetch(`${api}/user/authorize/userData`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                console.log(response);
            }
            return response.json();
        }).then(data => {
            var fullName = data.firstName + " " + data.lastName;
            fetch(`${api}/salon/visit/check/${idToCheck}`,{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                credentials:'include',
                body: JSON.stringify({comment: checkComment, visitId: idToCheck,workerNameAndSurname: fullName})
            })
                .then(response => {
                    if (!response.ok) {
                        setAlertMessage("Wystąpił błąd podczas odznaczanie wizyty")
                        setAlertMessageType("error")
                        setShowAlert(true);
                    }else{
                        setAlertMessage("Wysłano informację o odznaczonej wizycie")
                        setAlertMessageType("success")
                        setShowAlert(true);
                    }
                    loadTable()
                })
        })
    }


    const deleteVisit = () => {
        fetch(`${api}/user/authorize/userData`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                console.log(response);
            }
            return response.json();
        }).then(data => {
            var fullName = data.firstName + " " + data.lastName;
            fetch(`${api}/salon/visit/delete/${idToDelete}`,{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                credentials:'include',
                body: JSON.stringify({comment: deleteComment, visitId: idToDelete,workerNameAndSurname: fullName})
            })
                .then(response => {
                    if (!response.ok) {
                        setAlertMessage("Wystąpił błąd podczas usuwania wizyty")
                        setAlertMessageType("error")
                        setShowAlert(true);
                    }else{
                        setAlertMessage("Wysłano informację o usuniętej wizycie")
                        setAlertMessageType("success")
                        setShowAlert(true);
                    }
                    loadTable();
                })
        })
    }
    const handleEditClick = (params) => () => {
        fetch(`${api}/salon/worker/getWorkers`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include'
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the data here
                const workerNames = data.map(worker => worker.nameandsurname);
                setWorker(workerNames);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch(`${api}/salon/client/getAllClients`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include'
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);                }
                return response.json();
            })
            .then(data => {
                const clientNames = data.map(client => client.nameandsurname);
                setClient1(clientNames);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch(`${api}/salon/procedure/getAllProcedures`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include'
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);                }
                return response.json();
            })
            .then(data => {
                const procedureNames = data.map(procedure => procedure.name);
                setProcedure1(procedureNames);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setVisitDate(dayjs(params.row.date));
        setWorker1(params.row.workerName);
        setProcedure(params.row.procedureName);
        setClient(params.row.clientName);
        setPrice(parseInt(params.row.price.slice(0, -3)));
        setDuration(parseInt(params.row.duration.slice(0, -4)));
        setComment(params.row.comment);
        setRoom(params.row.roomNumber);
        const [hours, minutes] = params.row.hour.split(':');
        const date = new Date();
        date.setHours(hours, minutes);
        setVisitTime(date.getTime());
        setCurrentID(params.row.id);

        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseDeleteEdit = () => {
        setDeleteComment("");
        setDeleteDialogOpen(false);
        setShowAlert(false);
    }
    const handleCloseCheckEdit = () => {
        setCheckComment("");
        setCheckDialogOpen(false);
        setShowAlert(false);
    }
    const [t] = useTranslation('global');

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'clientName', headerName: t("SalonManager.clientName"), width: 170 },
        { field: 'workerName', headerName: t("SalonManager.workerName"), width: 170 },
        { field: 'procedureName', headerName: t("SalonManager.procedureName"), width: 150 },
        { field: 'date', headerName: t("SalonManager.date"), width: 100 },
        { field: 'hour', headerName: t("SalonManager.hour"), width: 100 },
        { field: 'roomNumber', headerName: t("SalonManager.roomNumber"), width: 100 },
        { field: 'duration', headerName: t("SalonManager.duration"), width: 100 },
        { field: 'price', headerName: t("SalonManager.price"), width: 100 },
        { field: 'isDone',type:'boolean', headerName: t("SalonManager.isDone"), width: 150 },
        { field: 'comment', headerName: t("SalonManager.comment"), width: 150 },
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
                    <GridActionsCellItem
                        icon={<CheckIcon />}
                        label="delete"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={() => handleCheckClick(params)()}
                    />,
                ];
            },
        },

    ];
    const text = props.localText;
    const api = `${API_BASE_URL}`
    const [rows, setRows] = React.useState([]);

    const loadTable = () => {
        fetch(`${api}/salon/visit/giveAll`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials:'include'
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);                }
                return response.json();
            })
            .then(data => {
                const visitsData = data.map(visit => ({ id: visit.id,
                    clientName: visit.clientName,
                    comment: visit.comment,
                    date: visit.date,
                    duration: visit.duration+" min",
                    hour: visit.hour,
                    price: visit.price+" zł",
                    procedureName: visit.procedureName,
                    roomNumber: visit.roomNumber,
                    workerName: visit.workerName,
                    isDone: (visit.isDone === 'true'),
                }));
                setRows(visitsData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(loadTable, []);

    return (
        <React.Fragment>
        <div style={{ height: '60vh', width: '100%' }}>
            <DataGrid
                loading={rows.length === 0}
                rows={rows}
                columns={columns}
                slotProps={{ pagination: {
                        labelRowsPerPage: t("SalonManager.rowsPerPage"),
                    } }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                localeText={text}
                pageSizeOptions={[10,25,100]}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>{t("calendar.adjustVisit")}</DialogTitle>
                    <FormControl>
                        <div className="formVisit">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="formVisitComponent">
                                    <DemoContainer components={['DatePicker']} sx={{marginRight: 2}}>
                                        <DatePicker label={t("calendar.date")} sx={{width: '100%'}}
                                                    required
                                                    value={dayjs(visitDate)}
                                                    onChange={(newValue) => {
                                                        setVisitDate(newValue);
                                                    }}/>
                                    </DemoContainer>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            required
                                            clearable
                                            value={dayjs(visitTime)}
                                            ampm={false}
                                            label={t("calendar.time")}
                                            sx={{width: '100%'}}
                                            onChange={(newValue) => {
                                                setVisitTime(newValue);
                                            }}
                                        />
                                    </DemoContainer>
                                </div>
                                <div className="formVisitComponent">
                                    <Autocomplete
                                        required
                                        disablePortal
                                        id="combo-box-demo"
                                        options={worker}
                                        value={worker1}
                                        sx={{width: 300, marginTop: 2}}
                                        renderInput={(params) => <TextField {...params}
                                                                            label={t("calendar.worker")}/>}
                                        onChange={(event, newValue) => {
                                            setWorker1(newValue);
                                        }}
                                    />

                                </div>
                                <div className="formVisitComponent">
                                    <Autocomplete
                                        freeSolo
                                        id="free-solo-demo"
                                        options={client1}
                                        value={client}
                                        sx={{width: 300, marginTop: 2}}
                                        renderInput={(params) => <TextField {...params} label={t("calendar.client")}/>}
                                        onChange={(event, newValue) => {
                                            setClient(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setClient(newInputValue);
                                        }}
                                    />

                                </div>
                                <div className="formVisitComponent">
                                    <Autocomplete
                                        required
                                        disablePortal
                                        id="combo-box-demo"
                                        options={procedure1}
                                        value={procedure}
                                        sx={{width: 300, marginTop: 2}}
                                        renderInput={(params) => <TextField {...params}
                                                                            label={t("calendar.procedure")}/>}
                                        onChange={(event, newValue) => {
                                            setProcedure(newValue);
                                        }}
                                    />
                                </div>
                                <div className="formVisitComponent">
                                    <TextField
                                        sx={{width: 300, marginTop: 2, marginRight: 2}}
                                        id="outlined-number"
                                        label={t("calendar.price")}
                                        type="number"
                                        value={price}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <TextField
                                        sx={{width: 300, marginTop: 2}}
                                        required
                                        id="outlined-number"
                                        label={t("calendar.duration")}
                                        type="number"
                                        value={duration}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </div>
                                <div className="formVisitComponent">
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={rooms}
                                        value={room}
                                        sx={{marginTop: 2}}
                                        renderInput={(params) => <TextField {...params}
                                                                            label={t("calendar.room")}/>}
                                        onChange={(event, newValue) => {
                                            setRoom(newValue);
                                        }}
                                    />
                                </div>
                                <div className="formVisitComponent">
                                    <TextField
                                        sx={{marginTop: 2}}
                                        id="outlined-multiline-static"
                                        label={t("calendar.comment")}
                                        multiline
                                        value={comment}
                                        rows={3}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                                <div className="formVisitComponent"><br/></div>
                                <Button variant="contained"
                                        endIcon={<SendIcon/>}
                                        onClick={addVisitForm}
                                >
                                    {t("SalonManager.updateVisit")}
                                </Button>
                                <div className="formVisitComponent"><br/></div>
                            </LocalizationProvider>
                        </div>
                    </FormControl>
                </Dialog>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={deleteDialogOpen}
                onClose={handleCloseDeleteEdit}
            >
                <DialogTitle>Dodaj komentarz do usunięcia wizyty</DialogTitle>
                <div style={{ width:350,display:'flex',marginRight: 'auto',marginLeft: 'auto'}}>
                    {showAlert &&
                        <Alert severity={alertMessageType}
                               variant="outlined"
                        ><b>{alertMessage}</b></Alert>
                    }
                </div>
                <div className="formVisit">
                    <FormControl>
                        <TextField
                            sx={{width: 500, marginTop: 2}}
                            id="outlined-multiline-static"
                            label={t("calendar.comment")}
                            multiline
                            value={deleteComment}
                            rows={3}
                            onChange={(e) => setDeleteComment(e.target.value)}
                        />
                    </FormControl>
                    <Button variant="contained"
                            endIcon={<SendIcon/>}
                            onClick={deleteVisit}
                            sx={{width: 200, marginTop: 2, marginBottom: 2}}
                    >
                        Usuń wizytę
                    </Button>
                </div>
            </Dialog>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={checkDialogOpen}
                onClose={handleCloseCheckEdit}
            >
                <DialogTitle>Dodaj komentarz do odznaczenia wizyty</DialogTitle>
                <div style={{ width:350,display:'flex',marginRight: 'auto',marginLeft: 'auto'}}>
                    {showAlert &&
                        <Alert severity={alertMessageType}
                               variant="outlined"
                        ><b>{alertMessage}</b></Alert>
                    }
                </div>
                <div className="formVisit">
                    <FormControl>
                        <TextField
                            sx={{width: 500, marginTop: 2}}
                            id="outlined-multiline-static"
                            label={t("calendar.comment")}
                            multiline
                            value={checkComment}
                            rows={3}
                            onChange={(e) => setCheckComment(e.target.value)}
                        />
                    </FormControl>
                    <Button variant="contained"
                            endIcon={<SendIcon/>}
                            onClick={checkVisit}
                            sx={{width: 200, marginTop: 2, marginBottom: 2}}
                    >
                        Odznacz wizytę
                    </Button>
                </div>
            </Dialog>
        </div>

        </React.Fragment>
    );
}