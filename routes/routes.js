const Router = require('express').Router()
const passport = require('../config/passport');
const cityControllers = require('../controllers/citiesControllers')
const usersControllers= require('../controllers/usersControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const commentControllers = require('../controllers/commentControllers')
const validator = require('../config/validator')
const itineraryControllers = require('../controllers/itineraryControllers')
const {getActivities, getOneActivity, removeActivity, addActivities, modifyActivity,getActivityByItinerary } = activitiesControllers;
const {getCities , getOneCity , removeCity, addCity, modifyCity} = cityControllers;
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, getItineraryByCity, likeDislike} = itineraryControllers;
const {signIn, signUp, verifyMail, verifyToken } = usersControllers;
const { addComment, deleteComment } = commentControllers;

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

Router.route('itineraries/like/:id')
.put(passport.authenticate('jwt', {session: false}),likeDislike) //porque el usuario requiere validarse

Router.route('/itineraries/activities')
.get(getActivities)
.post(addActivities)

Router.route('/itineraries/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route("/activitybyitinerary/activities/:id")
.get(getActivityByItinerary)

Router.route("/itineraries/comment")
.post(passport.authenticate("jwt", { session: false }), addComment);

Router.route("/itineraries/comment/delete/:id")
.post(passport.authenticate("jwt", { session: false }), deleteComment);
// Router.route('/comment/:id')
// .post(passport.authenticate('jwt', { session: false }), addComment)
// .put(passport.authenticate('jwt',{ session:false }),modifiComment)

// Router.route('/upload')
// .post(passport.authenticate('jwt',{ session:false }), upload) va auth?
module.exports = Router