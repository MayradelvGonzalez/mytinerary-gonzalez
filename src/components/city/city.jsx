import React, { useState } from 'react';
import SearchPage from '../components/searchPage/SearchPage'
import data from './data.json'
import NotFound from '../components/notFound/NotFound';

function Cities(){

    const [inputValue, setInputValue] = useState("");

    let filterInput = data.filter((city) => city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim()));

    return (
      <>
        <div className="containerInput">
         <input onKeyUp={
            (evento )=>{setInputValue(evento.target.value)}} type="text">
    
         </input>
        </div>
        <div className="cards">
            {filterInput.length > 0 ? (<SearchPage cardFilter={filterInput} />) : (<NotFound />) }
        </div>
      </>
        );}

export default Cities;

// target es el elugar donde se dispara el evento 
// onkeyup es cunado el usuario ltoca una tecla y suelta
// evetno.target.value sign que cuando el usuario suelt ela teclaidspara el evento
// declaro el cardfilter en searchpara llevarla como prop al mapeo 