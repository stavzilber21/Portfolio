import React from 'react';
import ESIMPackageSection from './components/ESIMPackageSection';
import Navbar from './components/Navbar';
import './App.css';
import PackageSection from './components/PackageSection';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar/>
      <ESIMPackageSection/>
      <PackageSection/>
      <Footer/>
    </div>
  );
}

export default App;
