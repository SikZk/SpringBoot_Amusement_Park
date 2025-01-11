import React from 'react';
import TopBar from "../generalComponents/TopBar";
import BottomBar from "../generalComponents/BottomBar";
import ImageSlider from "../generalComponents/ImageSlider";
import PopularProductsList from "../generalComponents/PopularProductsList";
import CategoriesList from "../generalComponents/CategoriesList";
import QuickInfoBar from "../generalComponents/QuickInfoBar";
import {WEBSITE_PATH} from "../../config/config";

const backgroundImageSlider = `${WEBSITE_PATH}/img/mainSlider/amusementpark1.jpg`;
const rightImageSlider = `${WEBSITE_PATH}/img/mainSlider/amusementpark2.webp`;

const leftImageCategoriesList = `${WEBSITE_PATH}/img/categoriesList/extreme.webp`;
const middleImageCategoriesList = `${WEBSITE_PATH}/img/categoriesList/family.jpg`;
const rightImageCategoriesList = `${WEBSITE_PATH}/img/categoriesList/littlekids.jpg`;

const firstImageQuickInfoBar = `${WEBSITE_PATH}/img/quickInfoBar/EcoFriendlyIcon.png`;
const secondImageQuickInfoBar = `${WEBSITE_PATH}/img/quickInfoBar/HandmadeIcon.png`;
const thirdImageQuickInfoBar = `${WEBSITE_PATH}/img/quickInfoBar/ShippingIcon.png`;
const fourthImageQuickInfoBar = `${WEBSITE_PATH}/img/quickInfoBar/TeamIcon.png`;


export default function HomePage() {
    return (
        <>
            <TopBar />
                <div className="mainContainer">
                    <ImageSlider
                        backgroundImage= {backgroundImageSlider}
                        rightImage= {rightImageSlider}
                    />
                    <CategoriesList
                        leftImage={leftImageCategoriesList}
                        middleImage={middleImageCategoriesList}
                        rightImage={rightImageCategoriesList}
                    />
                    <QuickInfoBar
                        firstImage={firstImageQuickInfoBar}
                        secondImage={secondImageQuickInfoBar}
                        thirdImage={thirdImageQuickInfoBar}
                        fourthImage={fourthImageQuickInfoBar}
                    />
                    <PopularProductsList

                    />
                </div>
            <BottomBar />
        </>
    );
}