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
            city = await Itineraries.findOne({_id:id})
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
        itinerarydb = await Itineraries.findIneAndUpdate({_id:id}, itinerary,{ new : true})
    }catch(err){ error = err }
    re.json({
        response: error ? 'error' : { itinerarydb },
        success: error ? false : true,
        error : error
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

   readItineraries: async (req,res)=>{
    const id = req.params.id
    let itineraries
    let error= null
    try{
        itineraries= await Itineraries.find({idCity}) //esto seria id? o idCity
    }catch (err) {
        error = err
    }
    res.json({
        response: error ? 'ERROR' : (itinerary),
        success: error ? false : true,
        error: error
})
   },
   getItineraryByCity : async(req, res)=>{
    const id= req.params.id
    let itineraries
    let error =null
    try {
        itineraries= await Itineraries.find({city:id})
    } catch (err) {error=err}
    res.json({
        response:error ? 'ERROR':{itineraries},
        success:error ? false: true,
        error: error
    })
}


}


module.exports = itinerariesControllers