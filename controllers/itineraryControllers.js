const Itineraries = require('../models/itineraries')

const itinerariesControllers = {
    getItineraries : async (req,res) =>{
        let itineraries 
        let error = null
        try{
            itineraries = await Itineraries.find()
        } catch (err) {error = err}
        res.json({
            response: error ? 'error' : { itineraries },
            success: error ? false : true,
            error : error
        })
    },
    getOneItinerary : async (req,res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try{
            itinerary = await Itineraries.findOne({_id:id}).populate('comments.userId')
        }catch(err){
       error = err
       console.log(error)
        }
        res.json({
            response: error ? 'error' : { itinerary },
            success: error ? false : true,
            error : error
        })
    },
    addItinerary : async(req,res) => {
        const {city,name,nameUser,image,description,activities,price,duration,hashtags,likes} = req.body.dataItineraries
        let itinerary
        let error = null
        try{
            itinerary = await new Itineraries({
                city:city,
                name:name,
                nameUser: nameUser,
                image:image,
                description:description,
                activities:activities,
                price:price,
                duration:duration,
                hashtags:hashtags,
                likes:likes
                

            }).save()
        }catch(err){
            error = err
        }
        res.json({
            response: error ? 'error' : { itinerary },
            success: error ? false : true,
            error : error
        })
    },
   modifyItinerary :async (req,res) => {
    const id = req.params
    const itinerary = req.body.data
    let itinerarydb
    let error = null
    try{
        itinerarydb = await Itineraries.findOneAndUpdate({_id:id}, itinerary,{ new : true})
    }catch(err){ error = err }
    res.json({
        response: error ? 'error' : { itinerarydb },
        success: error ? false : true,
        error : error,
        console: console.log(error)
    })
   },
   removeItinerary:async (req,res) =>{
    const id = req.params.id
    let itinerary
    let error = null
    try{
        city = await Itineraries.findOneAndDelete({_id:id})
    } catch(err){ error = err }
    res.json({
        response: error ? 'error' : itinerary ,
        success: error ? false : true,
        error : error
    })
   },

//    readItineraries: async (req,res)=>{
//     const id = req.params.id
//     let itineraries
//     let error= null
//     try{
//         itineraries = await Itineraries.find({idCity}).populate("activities")//permite hacer referencia a documentos de otras colecciones
//     }catch (err) {
//         error = err
//     }
//     res.json({
//         response: error ? 'ERROR' : (itinerary),
//         success: error ? false : true,
//         error: error
// })
//    },
   getItineraryByCity : async(req, res)=>{
    const id= req.params.id
    let itineraries
    let error =null
    try {
        itineraries= await Itineraries.find({city:id}).populate('activities').populate('comments.userId',{fullName:1, photo:1})
    } catch (err) {error=err}
    res.json({
        response:error ? 'ERROR':{itineraries},
        success:error ? false: true,
        error: error
    })
},

likeDislike: async (req, res) =>{
     const id = req.params.id //por parametro desde axios
     const user = req.user.id //por respuesta de passport
    await Itineraries.findOne({_id: id})//Busca por id,queviene por parametro,desde el front lepaso a laruta y entraenelcontroller
    .then((itinerary) => {
        if(itinerary.likes.includes(user)){
            Itineraries.findOneAndUpdate({_id: id}, { $pull: {likes: user}}, { new: true })
            .then((response) => 
            res.json({ 
                success: true, 
                response: response.likes,
                message: "Dislike 💔"
            }))
            .catch((error) => console.log(error))
        } else {
            Itineraries.findOneAndUpdate({ _id: id}, {$push: {likes:user}}, { new:true})
            .then((response) => 
            res.json({ 
                success: true, 
                response: response.likes,
                message: "Thanks for your like 💓"
                
            }))
           
            .catch((error) => console.log(error))
        }
    })//si place.like incluye user (si loincluye es true), va a actualizar el itinerario y hara un pull, extraera el id del usuario del array de likes, y new true me trae el cambio actualizado y luego me da una respuetsa
    .catch((error) => 
    res.json({ 
        success: false, 
        response: error,
        message: "Something goes wrong, please try again later"    
    }))
   },


}


module.exports = itinerariesControllers