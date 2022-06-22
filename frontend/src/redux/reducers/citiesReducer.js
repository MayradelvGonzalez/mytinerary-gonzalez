const initialState = {
    cities: [],
    auxiliar:[]
}

const citiesReducer = (state = initialState , action) => { 
 switch(action.type){  //en el switch tengo una condicion action.type...evalua por el tipo, sino va a default
    case "GETCITIES":
        return {
            ...state,
            cities: action.payload,
            auxiliar: action.payload

        }
        default:
        return state
   }
}
export default citiesReducer