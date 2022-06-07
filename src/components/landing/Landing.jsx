import React  from 'react';
// import SearchPage from '../searchPage/SearchPage';
import Carrousel from '../carrousel/Carrousel'


function Landing(){
return(
  
    <div className="container-landing">
     <div className="landing">
      <div className="container-titulos">
        <h1 className='titulo'>My Tinerary</h1>
        <h2>Find your perfect trip, designed by insiders who know and love their cities!</h2>
      </div>
      
     </div>
     <div className="botonCall">    
        <a href="../searchPage">Click here and Let's travel!</a>
       </div>
     <div className="conteiner-carusel">
      <Carrousel />
    </div>
    </div>
    );
   


  
}

export default Landing       