import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link as LinkRouter} from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import citiesActions from '../../redux/actions/citiesActions';

function Details(){
    // const[detailCity, setDetailCity] = useState([])
    const { id } = useParams()
    const dispatch = useDispatch()

   useEffect(() => {
    dispatch(citiesActions.getOneCity(id))
    // axios.get(`http://localhost:4000/api/cities/${id}`)
    // .then(res => setDetailCity(res.data.response.city))
   },[id])

const detailCity = useSelector((store) => store.citiesReducer.oneCity); //constante con lo que imprimo


    return(
        <div className="contenedor-detalles">
        <div className="detalles">
            <div className="card-contenido">
              <h3>{detailCity?.name}</h3>
             
                <img src={detailCity?.image} alt='img' className="imagenDetail" />
                  <p>{detailCity?.description}</p>
             </div>
            <div>
                <LinkRouter to={"/cities"}>
                    <button className="botonCard">Cities</button>
                </LinkRouter>
            </div>
           
        </div>
        
        </div>
    )

    
}

export default Details