const Router = require('express').Router()
const cityControllers = require('../controllers/citiesControllers')
const itineraryControllers = require('../controllers/itineraryControllers')
const {getCities , getOneCity , removeCity, addCity, modifyCity} = cityControllers;
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItineraries, getItinerariesByCity} = itineraryControllers; 


Router.route('/cities').get(getCities)
Router.route('/cities').post(addCity)
Router.route('/cities/:id').get(getOneCity)
Router.route('/cities/:id').put(modifyCity)
Router.route('/cities/:id').delete(removeCity)


// ITINERARIES



Router.route('/itineraries')
.get(getItineraries)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

// Router.route("/multiplesItineraries")
// .post(multiplesItineraries)

// Router.route("/itinerarybycity/:id")
// .get(getItinerariesByCity)



module.exports = Router