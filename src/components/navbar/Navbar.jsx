import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logoMytinerary from '../../img/logoMytinerary.jpg';

function NavBar(){
    return (
        <div className='container-navbar'>
            <div><img className="logo" src={logoMytinerary} alt="logo" /></div>
        <div className="menu">
            <div className='nav-menu'>
        <Navbar>
    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">Mark Otto</a>
      </Navbar.Text>
    </Navbar.Collapse>

</Navbar></div>
        </div>
        </div>
    )
}
export default NavBar