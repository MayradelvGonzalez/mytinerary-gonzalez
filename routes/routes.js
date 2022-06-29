const Router = require('express').Router()
const cityControllers = require('../controllers/citiesControllers')
const usersControllers= require('../controllers/usersControllers')
// const validator = require('./validator')
const itineraryControllers = require('../controllers/itineraryControllers')
const {getCities , getOneCity , removeCity, addCity, modifyCity} = cityControllers;
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, getItineraryByCity} = itineraryControllers;
const {signIn, signUp} = usersControllers;

Router.route('/cities')
.get(getCities)
.post(addCity)
Router.route('/cities/:id').get(getOneCity)
.put(modifyCity)
.delete(removeCity)

// ITINERARIES
Router.route('/itineraries')
.get(getItineraries)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route("/itinerarybycity/:id")
.get(getItineraryByCity)

// Loguin
Router.route('/auth/signin')
.post(signIn)
Router.route('/auth/signup')
.post(signUp)

module.exports = Router