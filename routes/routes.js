const Router = require('express').Router()
const passport = require('passport');
const cityControllers = require('../controllers/citiesControllers')
const usersControllers= require('../controllers/usersControllers')
const validator = require('../config/validator')
const itineraryControllers = require('../controllers/itineraryControllers')
const {getCities , getOneCity , removeCity, addCity, modifyCity} = cityControllers;
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, getItineraryByCity} = itineraryControllers;
const {signIn, signUp, verifyMail,verifyToken } = usersControllers;

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
.post(validator,signUp)
// Router.route('/auth/signOut')
// .post(signOut)
Router.route('/verify/:string')
.get(verifyMail)
Router.route('/auth/verifyToken')
.get(passport.authenticate('jwt', {session:false}), verifyToken)

module.exports = Router