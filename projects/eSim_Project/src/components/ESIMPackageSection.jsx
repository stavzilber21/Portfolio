
import React from 'react';
import eSIMImage from '../assets/eSIM.jpg'; 

const ESIMPackageSection = () => {
  return (
    
        <div className="container" id="section-1-gradient">
            <div className="row">
                <div className="col-6">
                <div className="leftSide-col">
                    <h1 className="large">eSIM package</h1>
                    <p className="large">
                    eSIM is a digital SIM technology embedded directly into a device, eliminating the need for a physical SIM card. It allows users to activate mobile plans remotely and manage multiple lines on one device. eSIM offers greater flexibility and convenience, especially for travelers.
                    </p>
                </div>
                <button className="learmMore">Learn More</button>
                </div>
                <div className="col-6">
                <div className="rightSide-col">
                    <div className="imgContainer">
                    <img
                        src={eSIMImage}
                        alt="eSIM Example"
                    />
                    </div>
                </div>
                </div>
            </div>
        </div>
    
  );
}

export default ESIMPackageSection;
