import React from 'react';
import {Button} from "@mui/material";


export default function CategoriesList({ leftImage, middleImage,rightImage }) {
    return (
        <div className="CategoriesListMainContainer">
            <div className="CategoryInCategoriesListGrid">
                <div className="CategoryInCategoriesHeader">
                    <h2>
                        <div className="CategoryInCategoriesHeaderHeader">
                            <div style={{color: "#B4B4B8"}}>Nasze</div>&nbsp;kategorie
                        </div>
                        <div className="CategoryInCategoriesHeaderDescription">
                            Na jaki miód masz dziś ochotę?
                        </div>
                    </h2>
                </div>
                <div className="CategoryInCategoriesList" style={{
                    gridRow: '2 / span 3',
                    gridColumn: '1'
                }}>
                    <img src={leftImage} alt="Miody Tradycyjne" className="CategoryInCategoriesListImage"/>
                    <div className="CategoryInCategoriesListCategoryName">
                        <div style={{opacity: 1}}>Miody tradycyjne</div>
                    </div>
                </div>
                <div className="CategoryInCategoriesList" style={{
                    gridRow: '2 / span 3',
                    gridColumn: '2'
                }}>
                    <img src={middleImage} alt="Zestawy Prezentowe" className="CategoryInCategoriesListImage"/>
                    <div className="CategoryInCategoriesListCategoryName">
                        <div style={{opacity: 1}}>Miody na prezent</div>
                    </div>
                </div>
                <div className="CategoryInCategoriesList" style={{
                    gridRow: '2 / span 3',
                    gridColumn: '3'
                }}>
                    <img src={rightImage} alt="Miody Smakowe" className="CategoryInCategoriesListImage"/>
                    <div className="CategoryInCategoriesListCategoryName">
                        <div style={{opacity: 1}}>Miody smakowe</div>
                    </div>
                </div>
            </div>
            <div className="CategoryInCategoriesListUnderGrid">
                <div className="CategoryInCategoriesListUnderGridLeft">
                    <Button
                        className="leftButton"
                        sx={{
                            width: "35%",
                            marginRight: "2%",
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
                        Wszystkie kategorie
                    </Button>
                    <Button
                        className="rightButton"
                        sx={{
                            width: "35%",
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
                        Współpraca z nami
                    </Button>
                </div>
                <div className="CategoryInCategoriesListUnderGridRight">
                    Nasze miody pochodzą z dziewiczo czystych terenów Warmii, gdzie pszczoły zbierają nektar z najczystszych kwiatów. Każdy słoik miodu to wynik naszej pasji i dbałości o każdy szczegół. Jesteśmy przekonani, że nasze miody spełnią oczekiwania nawet najbardziej wymagających klientów.
                </div>
            </div>
        </div>
    );
}