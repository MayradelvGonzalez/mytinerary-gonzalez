const mongoose = requiere('mongoose')


const itinerariesSchema =  new mongoose.Schema({
    name:{type:String, required:true},//?
    activities:{type:Array, required:true},
    description:{type: String, required:true}, //preguntas si puedo hacer un array de obj en actividad
    price:{type: String, required:true},
    likes:{type: number, required:true}
})
const Itineraries = mongoose.model('itineraries', itinerariesSchema)

module.exports = Itineraries