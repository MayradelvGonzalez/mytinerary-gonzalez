const initialState = {
    itineraries : [],
    getOneItinerary : {},
    getItinerariesByCity: []
}

const itinerariesReducer = (state = initialState, action) => {
    switch(action.type){
        case "GETITINERARIES":
            return {
                ...state,
                itineraries: action.payload
            }
            case "GETONEITINERARY":
                return{
                    ...state,
                    getOneItinerary: action.payload
                }
                case "GETITINERARIESBYCITY":
                    return{
                        ...state,
                        getItinerariesByCity: action.payload
                    }
                    default:
                        state
    }
}

export default itinerariesReducer

