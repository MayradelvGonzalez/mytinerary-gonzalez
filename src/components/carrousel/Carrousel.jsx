import React from 'react';
import Carousel from 'react-grid-carousel'
 
const Carrousel = (props) => {
  return (
   <div className="container-carrousel">
    <Carousel className="carrousel"
     loop
    mobileBreackpoint={300}
    responsiveLayout =
    {[
      // {
      //   breakpoint: 1200,
      //   cols: 3,  
      //   rows: 2,
      //   gap: 10,
      //   loop: true,
      //   autoplay: 4000,
      // },
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
     
     <h1 className='titulo-carrousel'>Popular MYtineraries</h1>
       {props.dataApi && props.dataApi.map(item => 
   

      <Carousel.Item>
        <img width="100%" className="imgCarrousel" src={item.image} />
       <h4 className="nombrePais">{item.name}</h4>
      </Carousel.Item>
    
       )}
    </Carousel> 
    </div>
  )
}

export default Carrousel