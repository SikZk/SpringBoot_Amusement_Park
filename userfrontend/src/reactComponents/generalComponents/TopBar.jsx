import React, {useEffect, useState} from 'react';
import {WEBSITE_PATH} from "../../config/config";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {InputAdornment, TextField} from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
// import SearchIcon from '@mui/icons-material/Search';


const logo = `${WEBSITE_PATH}/img/logoMiodyWowka.jpg`;


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
                    <DehazeIcon /><div>Sklep</div>
                </div>
                <div className="leftTopBarComponentOption">
                    Baza wiedzy
                </div>
                <div className="leftTopBarComponentOption">
                    O nas
                </div>
                <div className="leftTopBarComponentOption">
                    Kontakt
                </div>
            </div>
            <div className="topBarComponent rightTopBarComponent">
                <div className="rightTopBarComponentOption rightTopBarComponentOptionIcon">
                    <ShoppingCartIcon fontSize="medium"/>
                    <div>
                        Koszyk
                    </div>
                </div>
                <div className="rightTopBarComponentOption rightTopBarComponentOptionIcon">
                    <AccountBoxIcon fontSize="medium"/>
                    <div>
                        Konto
                    </div>
                </div>
                <div className="rightTopBarComponentOption rightTopBarComponentOptionSearchBar">
                    <TextField
                        variant="standard"
                        placeholder="Wyszukaj"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/*<SearchIcon className="searchIcon"/>*/}
                                </InputAdornment>
                            ),
                            classes: {
                                root: 'searchInputRoot',
                                underline: 'searchInputUnderline',
                            },
                        }}
                        className="searchField"
                    />
                </div>
            </div>
        </div>
    )
}