import React, { useState } from 'react';
import SearchPage from '../searchPage/SearchPage';
import NotFound from '../notFound/NotFound';
import { connect } from 'react-redux'
import { Animated } from "react-animated-css";

function Cities(props) {

  const [inputValue, setInputValue] = useState("");

  let filterInput = props.cities?.filter((city) => city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim()));
  return (
    <>    <div className="cajaInput">
      <div className="containerInput">
        <h3 className="buscadorTitulo">Search your favorite City!</h3>

        <input onKeyUp={
          (evento) => { setInputValue(evento.target.value) }} type="text" placeholder='search city...' >
        </input>
      </div>
    </div>

      <div className="cardsBox">
        {filterInput?.length > 0 ? (<SearchPage cardFilter={filterInput} />) : (<NotFound />)}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
    auxiliar: state.citiesReducer.auxiliar
  }
}

export default connect(mapStateToProps, null)(Cities);
