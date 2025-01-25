import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
    Box,
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Typography,
    CircularProgress
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../../config/config';

const drawerWidth = 240;

// Search styling
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
            width: '20ch'
        }
    }
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below the app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

export default function NavBar() {
    const navigate = useNavigate();
    const theme = useTheme();

    // Drawer open state
    const [open, setOpen] = useState(false);

    // Mobile menu states
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // For demonstration, your API base:
    const api = `${API_BASE_URL}`;

    // On mount, check if user is admin
    useEffect(() => {
        fetch(`${api}/user/authorize/admin`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            })
            .catch((error) => {
                console.error('Auth check error:', error);
            });
    }, [api]);

    // Mobile menu handlers
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    // For mobile menu
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>My Account</p>
            </MenuItem>
        </Menu>
    );

    // Drawer handlers
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Navigation
    function handleNavigation(name) {
        switch (name) {
            case 'Settings':
                return navigate('/settings');
            case 'Home':
                return navigate('/');
            case 'Dashboard':
                return navigate('/dashboard');
            case 'Calendar':
                return navigate('/calendar');
            case 'Management Panel':
                return navigate('/salon');
            case 'Manage Admin':
                return navigate('/manage');
            default:
                return null;
        }
    }

    // Icons for each drawer entry
    function getIcon(name) {
        switch (name) {
            case 'Settings':
                return <SettingsIcon />;
            case 'Home':
                return <HomeIcon />;
            case 'Dashboard':
                return <DashboardIcon />;
            case 'Calendar':
                return <CalendarMonthIcon />;
            case 'Management Panel':
                return <InfoIcon />;
            case 'Manage Admin':
                return <AdminPanelSettingsIcon />;
            default:
                return null;
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar position="sticky" sx={{ backgroundColor: '#F3B95F' }}>
                <Toolbar>
                    {/* Drawer toggle button */}
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

                    {/* Organization name */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Fast Lopez
                    </Typography>

                    {/* Search bar */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Right side icons */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* Example: Logout */}
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => navigate('/login')}
                        >
                            <Badge badgeContent={0} color="error">
                                <LogoutIcon />
                            </Badge>
                        </IconButton>
                        {/* Example: Account/Settings */}
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick={() => navigate('/settings')}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>

                    {/* Mobile menu toggle */}
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

            {/* Drawer */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ backgroundColor: '#F3B95F' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                {/* If authenticated, show the admin link as well */}
                {isAuthenticated ? (
                    <List>
                        {['Home', 'Dashboard', 'Calendar', 'Management Panel', 'Manage Admin'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => handleNavigation(text)}>
                                    <ListItemIcon>{getIcon(text)}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <List>
                        {['Home', 'Dashboard', 'Calendar', 'Management Panel'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => handleNavigation(text)}>
                                    <ListItemIcon>{getIcon(text)}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Divider />

                <List>
                    {['Settings'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleNavigation(text)}>
                                <ListItemIcon>{getIcon(text)}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
