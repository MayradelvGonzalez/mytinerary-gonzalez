import React, { useState } from 'react';
import SearchPage from '../searchPage/SearchPage';
import NotFound from '../notFound/NotFound';
import { connect } from 'react-redux'
 import citiesActions from '../../redux/actions/citiesActions'
//  import citiesReducer from '../../redux/reducers/citiesReducer'

function Cities(props){

    const [inputValue, setInputValue] = useState("");
    // const [city, setCity] = useState([]);
   

    let filterInput = props.cities?.filter((city) => city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim()));

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
        const mapDispatchToProps = {
          getCities : citiesActions.getCities
      }
       const mapStateToProps = (state) => {
        return {
        getCities:state.citiesReducer.cities,
        auxiliar:state.citiesReducer.auxiliar
        }
       }
       
export default connect(mapStateToProps,mapDispatchToProps)(Cities);

// target es el lugar donde se dispara el evento 
// onkeyup es cunado el usuario ltoca una tecla y suelta
// evetno.target.value sign que cuando el usuario suelt ela teclaidspara el evento
// declaro el cardfilter en searchpara llevarla como prop al mapeo 