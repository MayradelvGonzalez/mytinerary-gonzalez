import React from 'react';
import facebook from '../../img/facebook.png';
import instagram from '../../img/instagram.png';

function Footer(){
    return(
        <div className="container-footer">
            <div className='footer'>
               <a href="#"><img src={facebook} alt="logo-facebook" /></a>
               <a href="#"><img src={instagram} alt="logo-instagram" /></a>
            </div>
          
        </div>
    )
}
export default Footer