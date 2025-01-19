import React from "react";

//Card for each package
export const PackageCard = ({ name, description, price }) => {
  return (
    <div className="box">
      <label>{name}</label>
      <p>{description}</p>
      <p><strong>{price}</strong></p>
      <button className="learmMore">To join</button>
    </div>
  );
};
