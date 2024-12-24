import React from "react";

function RoundedBtn({ icon, onClick }) {
  return (
    <button onClick={onClick} >
      {icon}
    </button>
  );
}

export default RoundedBtn;
