import React from 'react'
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsWhatsapp } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import "../UI/loadingScreen.css";

export const LoadingScreen = ({ progress }) => {
  return (
    <div className="loading-screen">
    <span className="whatsapp-icon">
      <BsWhatsapp />
    </span>
    
    <div className="loading-content">
      <ProgressBar 
        variant="success" 
        now={progress} 
        className="progress-bar-custom"
      />
  
      <div className="text-section">
        <h1 className="app-name">WhatsApp</h1>
        <div className="text-info">
          <span className="lock-icon">
            <FaLock />
          </span>
          <p>End-to-end encrypted</p>
        </div>
      </div>
    </div>
  </div>
  
  );
}
export default LoadingScreen