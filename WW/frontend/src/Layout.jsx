import React, { useEffect } from 'react';
 import  Navbar  from './components/Common/Navbar';
import  Footer  from './components/Common/Footer';

const Layout = ({ children }) => {
  document.title="WorkingWaves";
  // useEffect(() =>{
  //   CSRF();},[]); 
    return (
      <div>
        <Navbar />
          <main>{children}</main>
        <Footer/>
      </div>
    );
   
}
export default Layout;
