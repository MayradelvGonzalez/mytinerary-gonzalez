import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link as LinkRouter} from 'react-router-dom';
import axios from 'axios';

function Details(){
    const[detailCity, setDetailCity] = useState([])
    const {id} = useParams()
   useEffect(() => {
    axios.get(`http://localhost:4000/api/cities/${id}`)
    .then(res => setDetailCity(res.data.response.city))
   },[])
console.log(detailCity)
    return(
        <div className="detalles">
           <div className="cardDetail">
            <div>
                <h3>{detailCity.name}</h3>
                <img src={detailCity.image} alt='img' />
                
            </div>
            <p>{detailCity.description}</p>
            <div>
                <LinkRouter to={"/cities"}>
                    <button>Cities</button>
                </LinkRouter>
            </div>
           </div>
        </div>
    )

    
}

export default Details