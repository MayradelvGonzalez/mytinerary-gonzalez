import React  from 'react';
import {Link as LinkRouter} from 'react-router-dom'


function Landing(){
return(
  
    <div className="container-landing">
     <div className="landing">
      <div className="container-titulos">
        <h1 className='titulo'>My Tinerary</h1>
        <h2>Find your perfect trip, designed by insiders who know and love their cities!</h2>
      </div>
     </div>
     <div className='container-boton'>
     <div className="botonCall">    
     <LinkRouter to='/cities' className="searchpage"><button classsName="botonCall">Click here and let's travel!</button></LinkRouter>
       </div>
       </div>

       
    </div>


    );
   


  
}

export default Landing       