const initialState = {
    cities: [],
    oneCity:[],
    auxiliar:[]
}

const citiesReducer = (state = initialState , action) => { 
 switch(action.type){  //en el switch tengo una condicion action.type...evalua por el tipo, sino va a default
    case "GET_CITIES":
        return {
            ...state,
            cities: action.payload,
            auxiliar: action.payload

        }
        case "GET_ONE_CITY":
            return{
            ...state,
            oneCity:action.payload,
            auxiliar:action.payload
            }
        default:
        return state
   }
}
export default citiesReducer