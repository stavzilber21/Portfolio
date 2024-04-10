import React from 'react';
import styles from "./button.module.css";

const Button = ({ type, title, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.btn}>
      {title}
    </button>
  );
};

export default Button;;
