import React  from 'react';
// import SearchPage from '../searchPage/SearchPage';
import Carrousel from '../carrousel/Carrousel'


function Landing(){
return(
  
    <div className="container-landing">
     <div className="landing">
      <div className="titulo">
        <h1 className='titulo'>My Tinerary</h1>
      </div>
       <div className="botonCall">    
        <a href="../searchPage">Click here and Let's travel!</a>
       </div>
     </div>
     <div className="conteiner-carusel">
      <Carrousel />
    </div>
    </div>
    );
   


  
}

export default Landing       