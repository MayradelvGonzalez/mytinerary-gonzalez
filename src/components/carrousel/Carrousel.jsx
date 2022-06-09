import React from 'react';
import Carousel from 'react-grid-carousel'
 
const Carrousel = (props) => {
  return (
   
    <Carousel
     loop
    mobileBreackpoint={300}
    responsiveLayout =
    {[
      {
        breakpoint: 1200,
        cols: 2,  
        rows: 2,
        gap: 10,
        loop: true,
      
      },
      {
        breakpoint: 1024,
        cols: 2,  
        rows: 2,
        gap: 10,
        loop: true,
      
      },
    
  {
    breakpoint: 768,
    cols: 2,
    rows: 2,
    gap: 10,
    loop: true,
  
  },
  {
    breakpoint: 576,
    cols: 1,
    rows: 4,
    gap: 10,
    loop: true,
   
  }
]}>
     
     <h1 className='titulo-carrousel'>Popular MYtineraries</h1>
       {props.dataApi && props.dataApi.map(item => 
   

      <Carousel.Item>
        <img width="100%" src={item.image} />
      </Carousel.Item>
    
       )}
    </Carousel> 
  )
}

export default Carrousel