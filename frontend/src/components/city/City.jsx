import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchPage from '../searchPage/SearchPage';
import NotFound from '../notFound/NotFound';
import { connect } from 'react-redux'
import citiesActions from '../../redux/actions/citiesActions'
import Itinerary from '../itinerary/Itinerary';
import {Link as LinkRouter} from 'react-router-dom';
// import citiesReducer from '../../redux/reducers/citiesReducer'

function Cities(props){

    const [inputValue, setInputValue] = useState("");
    //  const [city, setCity] = useState([]);
  //  const cities = useSelector ((store) => store.citiesReducer.cities)

    let filterInput = props.cities?.filter((city) => city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim()));

    return (
      <>
       
     
        <div className="containerInput">
        <h3 className="buscadorTitulo">Search your favorite City!</h3>
         <input onKeyUp={
            (evento )=>{setInputValue(evento.target.value)}} type="text" placeholder='search city...'>
    
         </input>
        
        </div>
        <div className="cardsBox">
            {filterInput?.length > 0 ? (<SearchPage cardFilter={filterInput} />) : (<NotFound />) }
        </div>
      </>
        );}
       
       
       const mapStateToProps = (state) => {
        return {
        cities:state.citiesReducer.cities,
        auxiliar:state.citiesReducer.auxiliar
        }
       }
    //    const mapDispatchToProps = {
    //     getCities : citiesActions.getCities
    // }
       
export default connect(mapStateToProps,null)(Cities);

// target es el lugar donde se dispara el evento 
// onkeyup es cunado el usuario ltoca una tecla y suelta
// evetno.target.value sign que cuando el usuario suelt ela teclaidspara el evento
// declaro el cardfilter en searchpara llevarla como prop al mapeo 