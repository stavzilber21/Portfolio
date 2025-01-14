import React from "react";
import './roundedBtn.css';


function RoundedBtn({ icon, onClick }) {
  return (
    <button className="rounded-btn" onClick={onClick} >
      {icon}
    </button>
  );
}

export default RoundedBtn;
