import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import {useTranslation} from "react-i18next";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {CircularProgress, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../config/config";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NavBar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const api = `${API_BASE_URL}`

    useEffect(() => {
        fetch(`${api}/user/authorize/admin`,{
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if(response.ok){
                setIsAuthenticated(true);
            }
        }).catch(error => {
        });
    }, []);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const navigate = useNavigate();
    const [t] = useTranslation('global');
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit" >
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>{t("navBar.messages")}</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>{t("navBar.notifications")}</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>{t("navBar.myAccount")}</p>
            </MenuItem>
        </Menu>
    );
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    function getIcon(name) {
        const settingsText = t("navBar.settings");
        const homeText = t("navBar.home");
        const dashboardText = t("navBar.dashboard");
        const calendarText = t("navBar.calendar");
        const managementPanelText = t("navBar.managementPanel");
        const manageAdminText = t("navBar.manageAdmin");

        switch(name) {
            case settingsText:
                return <SettingsIcon />;
            case homeText:
                return <HomeIcon />;
            case dashboardText:
                return <DashboardIcon />;
            case calendarText:
                return <CalendarMonthIcon />;
            case managementPanelText:
                return <InfoIcon />;
            case manageAdminText:
                return <AdminPanelSettingsIcon />;
            default:
                return null;
        }
    }
    function handleClickOpen(name){
        const settingsText = t("navBar.settings");
        const homeText = t("navBar.home");
        const dashboardText = t("navBar.dashboard");
        const calendarText = t("navBar.calendar");
        const managementPanelText = t("navBar.managementPanel");
        const manageAdmin = t("navBar.manageAdmin");
        switch(name) {
            case settingsText:
                return navigate('/settings')
            case homeText:
                return navigate('/')
            case dashboardText:
                return navigate('/dashboard')
            case calendarText:
                return navigate('/calendar')
            case managementPanelText:
                return navigate('/salon')
            case manageAdmin:
                return navigate('/manage')
            default:
                return null;
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="sticky" sx={{
                backgroundColor: '#F3B95F'
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={handleDrawerOpen}
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {t("navBar.organizationName")}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={t("navBar.search")}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            <Badge badgeContent={0} color="error">
                                <LogoutIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={()=> {
                                navigate('/settings')
                            }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{
                    backgroundColor: '#F3B95F'
                }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {isAuthenticated ? (
                    <List>
                        {[t("navBar.home"),t("navBar.dashboard"), t("navBar.calendar"),t("navBar.managementPanel"),t("navBar.manageAdmin")].map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => handleClickOpen(text)}>
                                    <ListItemIcon>
                                        {getIcon(text)}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <List>
                        {[t("navBar.home"),t("navBar.dashboard"), t("navBar.calendar"),t("navBar.managementPanel")].map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => handleClickOpen(text)}>
                                    <ListItemIcon>
                                        {getIcon(text)}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
                <Divider />
                <List>
                    {[t("navBar.settings")].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleClickOpen(text)}>
                                <ListItemIcon>
                                    {getIcon(text)}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}