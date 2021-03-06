import React from 'react';
import Carousel from 'react-grid-carousel';
import { useSelector } from 'react-redux';
import { Animated } from "react-animated-css";

const Carrousel = () => {

  const cities = useSelector(store => store.citiesReducer.cities)

  return (
    <div className="container-carrousel">
      <Animated animationIn="zoomIn" isVisible={true}><h1 className='titulo-carrousel'>Popular Mytineraries</h1></Animated>
      {/* <Carousel cols={2} rows={2} gap={10} autoplay={4000} loop className="carrousel"
        mobileBreackpoint={250}
        responsiveLayout=
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
          },
          {
            breakpoint: 370,
            cols: 1,
            rows: 4,
            gap: 5,
            loop: true,
            autoplay: 4000,
          }
        ]}> */}
        <Carousel mobileBreakpoint={300} cols={2} rows={2} gap={10} autoplay={2000} className="carrousel" loop
            responsiveLayout={[
            {
                breakpoint:760,
                cols: 1,
                rows: 4,
                gap: 10,
                loop: true,
                autoplay: 2000
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