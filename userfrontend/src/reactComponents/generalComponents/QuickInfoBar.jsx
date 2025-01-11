import React from 'react';

export default function QuickInfoBar({firstImage, secondImage, thirdImage, fourthImage}) {
    return (
        <div className="quickInfoBarContainer">
            <div className="quickInfoBarElement">
                <img src={firstImage} alt="firstImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Ekologiczne produkty</h3>
                    <p>Wszystkie nasze produkty są w 100% ekologiczne</p>
                </div>
            </div>
            <div className="quickInfoBarElement">
                <img src={secondImage} alt="secondImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Ręcznie robione</h3>
                    <p>Wszystkie nasze produkty są ręcznie robione</p>
                </div>
            </div>
            <div className="quickInfoBarElement">
                <img src={thirdImage} alt="thirdImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Darmowa dostawa</h3>
                    <p>Darmowa dostawa przy zamówieniu powyżej 100zł</p>
                </div>
            </div>
            <div className="quickInfoBarElement">
                <img src={fourthImage} alt="fourthImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Zespół</h3>
                    <p>Nasz zespół jest zawsze gotowy do pomocy</p>
                </div>
            </div>
        </div>
    );
}