import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

function NotFound(){
    return(
        <div className="notFound"><h1>City was not found</h1>
              <LinkRouter to={"/cities"}>
            <button className="botonCard">Back to Cities</button>
           </LinkRouter>
        </div>
       

    )
}

export default NotFound 