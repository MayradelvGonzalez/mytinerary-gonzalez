import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import itinerariesReducer from './itinerariesReducer'

const mainReducer = combineReducers({
    citiesReducer,
    itinerariesReducer
})

export default mainReducer;
