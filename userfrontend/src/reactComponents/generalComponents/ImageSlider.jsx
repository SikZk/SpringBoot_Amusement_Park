import React from "react";
import {Button} from "@mui/material";

export default function ImageSlider({ backgroundImage, rightImage }) {
    return (
        <div className="imageMainSlider">
            <div className="imageMainSliderContainer">
                <img src={backgroundImage} alt="PasiekaMiodów" className="imageMainSliderContainerImage"/>
                <div className="imageMainSliderContainerLeftContent">
                    <h1>
                        <div className="imageMainSliderContainerLeftContentHeader">
                            Miody<br />
                            z Warmii
                        </div>
                    </h1>
                    <div className="imageMainSliderContainerLeftContentDescription">
                        Całkowicie naturalny miód z rodzinnej pasieki w sercu Warmii.
                    </div>
                    <div className="imageMainSliderContainerLeftContentButtonContainer">
                        <Button
                            className="leftButton"
                            sx={{
                                width: "200px",
                                backgroundColor: '#1E201E',
                                color: '#F5F5F5',
                                borderRadius: '0',
                                padding: '10px 20px',
                                border: '2px solid #F5F5F5',
                                '&:hover': {
                                    backgroundColor: '#F5F5F5',
                                    color: '#1E201E',
                                    border: '2px solid #1E201E'
                                }
                            }}
                            variant="contained"
                        >
                            Nasz Blog
                        </Button>
                        <Button
                            className="rightButton"
                            sx={{
                                width: "200px",
                                backgroundColor: '#F5F5F5',
                                color: '#1E201E',
                                borderRadius: '0',
                                padding: '10px 20px',
                                border: '2px solid #1E201E',
                                '&:hover': {
                                    backgroundColor: '#1E201E',
                                    color: '#F5F5F5',
                                    border: '2px solid #F5F5F5'
                                }
                            }}
                            variant="contained"
                        >
                            Nasza oferta
                        </Button>
                    </div>
                </div>
                <div className="imageMainSliderContainerImageRight">
                    <img src={rightImage} alt="Miody" className="imageMainSliderContainerImageRightImage"/>
                </div>
            </div>
        </div>
    );
}
