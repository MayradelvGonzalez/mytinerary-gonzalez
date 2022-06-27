import React from 'react';
import Carousel from 'react-grid-carousel';
import { useSelector } from 'react-redux';

const Carrousel = () => {
 
  const cities = useSelector(store => store.citiesReducer.cities)

  return (
   <div className="container-carrousel">
    <h1 className='titulo-carrousel'>Popular Mytineraries</h1>
     <Carousel cols={2} rows={2} gap={10} autoplay={4000} loop className="carrousel" 
      mobileBreackpoint={300}
      responsiveLayout =
    {[
      {
        breakpoint: 1024,
        cols: 2,  
        rows: 2,
        gap: 10,
        loop: true,
        autoplay: 4000,
      
      },
    
     {
       breakpoint: 768,
       cols: 2,
       rows: 2,
       gap: 10,
       loop: true,
       autoplay: 4000,
     },
     {
       breakpoint: 576,
       cols: 1,
       rows: 4,
       gap: 10,
       loop: true,
       autoplay: 4000,
     }
 ]}>    
    {cities?.map(item => 
      <Carousel.Item key={item._id}>
        <img width="100%" className="imgCarrousel" src={item.image} />
         <h4 className="nombrePais">{item.name}</h4>
      </Carousel.Item>
     )}
    </Carousel> 
  </div>
 )
}

export default Carrousel