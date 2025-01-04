import {Outlet, Navigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import { API_BASE_URL } from '../config';
const PrivateRoutes = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const api = `${API_BASE_URL}`

    useEffect(() => {
        fetch(`${api}/admin/authorize`,{
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            setIsLoading(false);
            if(response.ok){
                setIsAuthenticated(true);
            }
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes;