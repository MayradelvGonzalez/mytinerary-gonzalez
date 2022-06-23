const mongoose = require('mongoose')


const itinerariesSchema =  new mongoose.Schema({
    city:{type: mongoose.Types.ObjectId, ref: "cities"},
    name:{type:String, required:true},
    nameUser: {type:String, required:true},
    image:{type:String, required:true},
    description:{type: String, required:true},
    activities:{type: String, required:true},
    price:{type: String, required:true},
    duration:{type: String, required:true},
    hashtags:{type: Array, requires:true},
    likes:{type: Array, required:true}
})
const Itineraries = mongoose.model('itineraries', itinerariesSchema)

module.exports = Itineraries
