import React, {useEffect, useState} from 'react';
import {WEBSITE_PATH} from "../../config/config";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {InputAdornment, TextField} from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
// import SearchIcon from '@mui/icons-material/Search';


const logo = `${WEBSITE_PATH}/img/logo.png`;


export default function TopBar() {

    const [logoSize, setLogoSize] = useState(100);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newLogoSize = Math.max(75, 100 - scrollY * 0.1);
            setLogoSize(newLogoSize);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="topBarContainer">
            <div className="topBarComponent leftTopBarComponent">
                <div className="logoContainer">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                        style={{width: `${logoSize}px`}}
                    />
                </div>
                <div className="leftTopBarComponentOption leftTopBarComponentOptionShopOption">
                    <DehazeIcon /><div>Buy tickets</div>
                </div>
                <div className="leftTopBarComponentOption">
                    Blog
                </div>
                <div className="leftTopBarComponentOption">
                    About us
                </div>
                <div className="leftTopBarComponentOption">
                    Contact
                </div>
            </div>
            <div className="topBarComponent rightTopBarComponent">
                <div className="rightTopBarComponentOption rightTopBarComponentOptionIcon">
                    <ShoppingCartIcon fontSize="medium"/>
                    <div>
                        Cart
                    </div>
                </div>
                <div className="rightTopBarComponentOption rightTopBarComponentOptionIcon">
                    <AccountBoxIcon fontSize="medium"/>
                    <div>
                        Account
                    </div>
                </div>
            </div>
        </div>
    )
}