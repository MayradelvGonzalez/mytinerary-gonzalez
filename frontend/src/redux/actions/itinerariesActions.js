import axios from 'axios'

const itinerariesActions = {
    getItineraries: () => {
        return async (dispatch, getState) => {
            const res = await axios.get("http://localhost:4000/api/itineraries")
            dispatch({type: "GETITINERARIES", payload: res.data.response.itineraries})
        }
    },

    getOneCity: (id) => {
        return async(dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/cities/${id}`)
            dispatch({type: "GETONEITINERARY", payload: res.data.response.city})
        }
    },
    getItinerariesByCity: (id) => {
        return async(dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerariesbycity/${id}`)
            dispatch({type: "GETITINERARIESBYCITY", payload: res.data.response})
        }
    },
    
}

export default itinerariesActions