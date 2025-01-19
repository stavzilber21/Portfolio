import React from "react";
import styles from './roundedBtn.module.css';


function RoundedBtn({ icon, onClick }) {
  return (
    <button className={styles.roundedBtn} onClick={onClick} >
      {icon}
    </button>
  );
}

export default RoundedBtn;
