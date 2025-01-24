import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { WEBSITE_PATH, API_BASE_URL } from '../../config/config';

const logo = `${WEBSITE_PATH}/img/logo.png`;

export default function TopBar() {
    const [logoSize, setLogoSize] = useState(100);

    // State to manage the "Buy Tickets" dialog
    const [openBuyDialog, setOpenBuyDialog] = useState(false);

    // Adjust logo size on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newLogoSize = Math.max(75, 100 - scrollY * 0.1);
            setLogoSize(newLogoSize);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Open/close the "Buy Tickets" dialog
    const handleOpenBuyDialog = () => setOpenBuyDialog(true);
    const handleCloseBuyDialog = () => setOpenBuyDialog(false);

    // POST the selected ticket level
    const handleTicketPurchase = (level) => {
        fetch(`${API_BASE_URL}/user-panel/clients/buyTicket`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ticketLevel: level })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Do something on success, e.g. show a success message
                console.log(`Ticket purchased (level: ${level})`);
            })
            .catch((error) => {
                console.error('Error buying ticket:', error);
            })
            .finally(() => {
                handleCloseBuyDialog();
            });
    };

    return (
        <div className="topBarContainer">
            <div className="topBarComponent leftTopBarComponent">
                <div className="logoContainer">
                    <a href={`${WEBSITE_PATH}/`} style={{ textDecoration: 'none' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="logo"
                            style={{ width: `${logoSize}px` }}
                        />
                    </a>
                </div>

                {/* CLICKABLE "Buy tickets" - opens the dialog */}
                <div
                    className="leftTopBarComponentOption leftTopBarComponentOptionShopOption"
                    style={{ cursor: 'pointer' }}
                    onClick={handleOpenBuyDialog}
                >
                    <DehazeIcon />
                    <div>Buy tickets</div>
                </div>

                <div className="leftTopBarComponentOption">Blog</div>
                <div className="leftTopBarComponentOption">About us</div>
                <div className="leftTopBarComponentOption">Contact</div>
            </div>

            <div className="topBarComponent rightTopBarComponent">
                <a
                    href={`${WEBSITE_PATH}/myaccount`}
                    className="rightTopBarComponentOption rightTopBarComponentOptionIcon"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <AccountBoxIcon fontSize="medium" />
                    <div>Account</div>
                </a>
            </div>

            {/* BUY TICKETS DIALOG */}
            <Dialog open={openBuyDialog} onClose={handleCloseBuyDialog}>
                <DialogTitle>Choose Your Ticket Level</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        minWidth: '250px'
                    }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleTicketPurchase('high')}
                    >
                        High (Extreme)
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleTicketPurchase('medium')}
                    >
                        Medium
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleTicketPurchase('low')}
                    >
                        Low
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBuyDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
