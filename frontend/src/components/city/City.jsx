import React, { useState, useEffect } from 'react';
import SearchPage from '../searchPage/SearchPage';
import NotFound from '../notFound/NotFound';


function Cities({props}){

    const [inputValue, setInputValue] = useState("");
    // const [city, setCity] = useState([]);
   

    let filterInput = props.filter((city) => city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim()));

    return (
      <>
 
        <div className="containerInput">
         <input onKeyUp={
            (evento )=>{setInputValue(evento.target.value)}} type="text" >
    
         </input>
        </div>
        <div className="cardsBox">
            {filterInput.length > 0 ? (<SearchPage cardFilter={filterInput} />) : (<NotFound />) }
        </div>
      </>
        );}

export default Cities;

// target es el lugar donde se dispara el evento 
// onkeyup es cunado el usuario ltoca una tecla y suelta
// evetno.target.value sign que cuando el usuario suelt ela teclaidspara el evento
// declaro el cardfilter en searchpara llevarla como prop al mapeo 