import React from 'react';
import {Button} from "@mui/material";


export default function CategoriesList({ leftImage, middleImage,rightImage }) {
    return (
        <div className="CategoriesListMainContainer">
            <div className="CategoryInCategoriesListGrid">
                <div className="CategoryInCategoriesHeader">
                    <h2>
                        <div className="CategoryInCategoriesHeaderHeader">
                            <div style={{color: "#B4B4B8"}}>Our</div>&nbsp;attractions
                        </div>
                        <div className="CategoryInCategoriesHeaderDescription">
                            What do you want to try next nigger?
                        </div>
                    </h2>
                </div>
                <div className="CategoryInCategoriesList" style={{
                    gridRow: '2 / span 3',
                    gridColumn: '1'
                }}>
                    <img src={leftImage} alt="Miody Tradycyjne" className="CategoryInCategoriesListImage"/>
                    <div className="CategoryInCategoriesListCategoryName">
                        <div style={{opacity: 1}}>Extreme zone</div>
                    </div>
                </div>
                <div className="CategoryInCategoriesList" style={{
                    gridRow: '2 / span 3',
                    gridColumn: '2'
                }}>
                    <img src={middleImage} alt="Zestawy Prezentowe" className="CategoryInCategoriesListImage"/>
                    <div className="CategoryInCategoriesListCategoryName">
                        <div style={{opacity: 1}}>Family zone</div>
                    </div>
                </div>
                <div className="CategoryInCategoriesList" style={{
                    gridRow: '2 / span 3',
                    gridColumn: '3'
                }}>
                    <img src={rightImage} alt="Miody Smakowe" className="CategoryInCategoriesListImage"/>
                    <div className="CategoryInCategoriesListCategoryName">
                        <div style={{opacity: 1}}>Little kids zone</div>
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
                        All attractions
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
                        Concact
                    </Button>
                </div>
                <div className="CategoryInCategoriesListUnderGridRight">
                    Since opening in 2020 our park is one of the greatest amusement parks in the world and is obligatory destination for every tourist, that come to Poland. Fast Lopez has a great number of amazing attraction and will give you a lot of lasting memories, we can promise you that. Come here and give it a try!
                </div>
            </div>
        </div>
    );
}