import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link as LinkRouter} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import citiesActions from '../../redux/actions/citiesActions';
import Itinerary from '../itinerary/Itinerary';
import {Animated} from "react-animated-css";

function Details(){
   
const { id } = useParams()
const dispatch = useDispatch()

  useEffect(() => {
  dispatch(citiesActions.getOneCity(id))
   
   },[])

   const detail = useSelector(store => store.citiesReducer.oneCity); 

    return(
     <>
      {detail &&  
      <div className="contenedor-detalles">
         <div className="detalles">
         
        <div className="card-contenido">
        <Animated animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}><h3>{detail.name}</h3></Animated>
        <Animated animationIn="fadeInRight" animationOut="fadeOut" isVisible={true}><img src={detail.image} alt='img' className="imagenDetail" /></Animated>
                  <p>{detail.description}</p>
            </div>
         {/* <div>
        
         <div className='itinerary'><Itinerary /></div>
            </div> */}
           <LinkRouter to={"/cities"}>
            <button className="botonCard">Back to Cities</button>
           </LinkRouter>
          </div>
        </div>
        }
     </>
    )   
  }

export default Details