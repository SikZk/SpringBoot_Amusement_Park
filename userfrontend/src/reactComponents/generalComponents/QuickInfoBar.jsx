import React from 'react';

export default function QuickInfoBar({firstImage, secondImage, thirdImage, fourthImage}) {
    return (
        <div className="quickInfoBarContainer">
            <div className="quickInfoBarElement">
                <img src={firstImage} alt="firstImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Eco-friendly politics</h3>
                    <p>We use renewable energy sources to run attractions</p>
                </div>
            </div>
            <div className="quickInfoBarElement">
                <img src={secondImage} alt="secondImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Safety</h3>
                    <p>Attractions was constructed by world-class engineers</p>
                </div>
            </div>
            <div className="quickInfoBarElement">
                <img src={thirdImage} alt="thirdImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Cheap transport</h3>
                    <p>We offer discount for transport from big cities</p>
                </div>
            </div>
            <div className="quickInfoBarElement">
                <img src={fourthImage} alt="fourthImage" className="quickInfoBarElementIcon" />
                <div className="quickInfoBarElementDescription">
                    <h3>Team</h3>
                    <p>Staff is well trained and ready for every surprise</p>
                </div>
            </div>
        </div>
    );
}