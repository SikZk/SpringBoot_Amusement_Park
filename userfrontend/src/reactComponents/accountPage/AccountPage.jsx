import TopBar from "../generalComponents/TopBar";
import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { WEBSITE_PATH } from "../../config/config";

const images = [
    {
        url: `${WEBSITE_PATH}/img/accountPage/settings.png`,
        title: 'Account settings',
        width: '33.2%',
        link: `${WEBSITE_PATH}/settings`,
    },
    {
        url: `${WEBSITE_PATH}/img/accountPage/ticket.png`,
        title: 'My tickets',
        width: '33.2%',
        link: `${WEBSITE_PATH}/mytickets`,
    },
    {
        url: `${WEBSITE_PATH}/img/accountPage/park.png`,
        title: 'Back to main page',
        width: '33.2%',
        link: `${WEBSITE_PATH}/`,
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: '88vh',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function AccountPage() {
    return (
        <div>
            <TopBar />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', gap: '0.2%' }}>
                {images.map((image) => (
                    <a
                        key={image.title}
                        href={image.link} // Dodano link
                        style={{ textDecoration: 'none', color: 'inherit', width: image.width }}
                    >
                        <ImageButton
                            focusRipple
                            style={{
                                width: '100%',
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={(theme) => ({
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: `calc(${theme.spacing(1)} + 6px)`,
                                    })}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    </a>
                ))}
            </Box>
        </div>
    );
}
