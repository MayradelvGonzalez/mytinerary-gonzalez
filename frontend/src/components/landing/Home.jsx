import React  from 'react';
import {Link as LinkRouter} from 'react-router-dom'
import Carrousel from '../carrousel/Carrousel'
import {Animated} from "react-animated-css";

function Home(){
 
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
  <Animated animationIn="jello" isVisible={true}><LinkRouter to= '/cities' className="searchpage">
      <button className="botonCall">Click here and let's travel!</button>
     </LinkRouter></Animated>
    </div>
   </div>
  </div>
 <div className="carrouselCaja"><Carrousel /></div>
</div>
  );
}

export default Home      