import React, { useEffect, useState } from 'react';
import { WEBSITE_PATH } from "../../config/config";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DehazeIcon from '@mui/icons-material/Dehaze';

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
                    {/* Dodano odnośnik wokół logo */}
                    <a href={`${WEBSITE_PATH}/`} style={{ textDecoration: 'none' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="logo"
                            style={{ width: `${logoSize}px` }}
                        />
                    </a>
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
                <a
                    href={`${WEBSITE_PATH}/myaccount`}
                    className="rightTopBarComponentOption rightTopBarComponentOptionIcon"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <AccountBoxIcon fontSize="medium" />
                    <div>
                        Account
                    </div>
                </a>
            </div>
        </div>
    );
}
