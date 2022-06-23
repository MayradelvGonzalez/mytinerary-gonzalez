import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import itinerariesActiones from '../redux/actions/itinerariesActions'
 
function Itinerary(){
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(itinerariesActiones.getItinerariesByCity(id))
    },[])
    const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
    return (

    )
}

export default Itinerary