import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link as LinkRouter} from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import citiesActions from '../../redux/actions/citiesActions';
import Itinerary from '../itinerary/Itinerary';

function Details(){
    // const[detailCity, setDetailCity] = useState([])
    const { id } = useParams()
    const dispatch = useDispatch()

   useEffect(() => {
    dispatch(citiesActions.getOneCity(id))
    // axios.get(`http://localhost:4000/api/cities/${id}`)
    // .then(res => setDetailCity(res.data.response.city))
   },[])

const detail = useSelector(store => store.citiesReducer.oneCity); //constante con lo que imprimo

    return(
     
        <>
        {detail &&  
        <div className="contenedor-detalles">
        <div className="detalles">
            <div className="card-contenido">
              <h3>{detail.name}</h3>
             
                <img src={detail.image} alt='img' className="imagenDetail" />
                  <p>{detail.description}</p>
             </div>
            <div>
                <LinkRouter to={"/cities"}>
                    <button className="botonCard">Back to Cities</button>
                </LinkRouter>
                <div className='itinerary'><Itinerary /></div>

            </div>
           
        </div>
        
        </div>
        }
        </>
    )

    
}

export default Details