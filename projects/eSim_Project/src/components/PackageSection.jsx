import React from "react";
import { PackageCard } from "./PackageCard";

const fakeAPI = () => {
  return [
    {
      id: 1,
      name: "Basic",
      description: "3GB data package, perfect for light users.",
      price: "$10",
    },
    {
      id: 2,
      name: "Standard",
      description: "10GB data package, ideal for regular users.",
      price: "$20",
    },
    {
      id: 3,
      name: "Premium",
      description: "50GB data package, the ultimate solution for heavy users.",
      price: "$50",
    },
  ];
};

const PackageSection = () => {

  const packages = fakeAPI();

  return (
    <div className="package-section">
      <header>
        <h1 className="section2Header">Our packages</h1>
      </header>
      <div className="container">
        <div className="row">
          {packages.map((pkg) => (
            <div className="col-4" key={pkg.id}>
              <PackageCard
                name={pkg.name}
                description={pkg.description}
                price={pkg.price}
              />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <button className="learmMore">More...</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSection