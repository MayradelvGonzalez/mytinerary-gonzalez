const mongoose = require('mongoose') //construnctor que crea el modelo de pedido de datos

const activitiesSchema = new mongoose.Schema({
    imageActivity : {type: String, required:true},
    names: {type: String, required:true}
    // description:{type: String, required:true}
}
)

const Activities = mongoose.model('activities', activitiesSchema); //defino el contructor del modelo

module.exports = Activities; //exporto el modelo