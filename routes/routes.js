const Router = require('express').Router()
const cityControllers = require('../controllers/citiesControllers')

const {getCities , getOneCity , removeCity, addCity, modifyCity} = cityControllers

Router.route('/cities').get(getCities)
Router.route('/cities').post(addCity)
Router.route('/cities/:id').get(getOneCity)
Router.route('/cities/:id').put(modifyCity)
Router.route('/cities/:id').delete(removeCity)

module.exports = Router