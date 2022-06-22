import React  from 'react';
import {Link as LinkRouter} from 'react-router-dom'
import Carrousel from '../carrousel/Carrousel'
<<<<<<< HEAD:frontend/src/components/landing/Home.jsx
import Cities from '../city/City';
=======
>>>>>>> 83e1385d6189f53e3599af9315afcd988256b5e4:frontend/src/components/landing/Landing.jsx

function Home({props}){

return(
  <div>
    <div className="container-landing">
     <div className="landing">
      <div className="container-titulos">
        <h1 className='titulo'>Mytinerary</h1>
        <h2>Find your perfect trip, designed by insiders who know and love their cities!</h2>
      </div>
     </div>
     
     <div className='container-boton'>

    <div className="botonCall">    
     <LinkRouter to= '/cities' className="searchpage">
    
      <button className="botonCall">Click here and let's travel!</button>
     </LinkRouter>
    </div>

      </div>
      </div>
    <div className="carrouselCaja"> <Carrousel props={props} /></div>
   
 
  </div>

    );
}

export default Home      