const Activities = require('../models/activities')

const activitiesControllers = {
    getActivities : async (req,res) =>{
        let activities 
        let error = null
        try{
            activities = await Activities.find()
        } catch (err) {error = err}
        res.json({
            response: error ? 'error' : { activities },
            success: error ? false : true,
            error : error
        })
    },
    getOneActivity : async (req,res) => {
        const id = req.params.id
        let activity
        let error = null
        try{
            city = await Activities.findOne({_id:id})
        }catch(err){
       error = err
       console.log(error)
        }
        res.json({
            response: error ? 'error' : { activity },
            success: error ? false : true,
            error : error
        })
    },
    addActivities : async(req,res) => {
        const {imageActivity, names, description} = req.body.dataActivities
        let activity
        let error = null
        try{
            activity = await new Activities({
                imageActivity: imageActivity,
                names:names,
                description:description,
               
            }).save()
        }catch(err){
            error = err
        }
        res.json({
            response: error ? 'error' : { activity },
            success: error ? false : true,
            error : error
        })
    },
   modifyActivity :async (req,res) => {
    const id = req.params
    const activity = req.body.data
    let activitydb
    let error = null
    try{
        activitydb = await Activities.findIneAndUpdate({_id:id}, activity,{ new : true})
    }catch(err){ error = err }
    re.json({
        response: error ? 'error' : { activitydb },
        success: error ? false : true,
        error : error
    })
   },
   removeActivity:async (req,res) =>{
    const id = req.params.id
    let activity
    let error = null
    try{
        itinerary = await Activities.findOneAndDelete({_id:id})
    } catch(err){ error = err }
    res.json({
        response: error ? 'error' : activity ,
        success: error ? false : true,
        error : error
    })
   },

   readActivities: async (req,res)=>{
    const id = req.params.id
    let activities
    let error= null
    try{
        activities = await Activities.find({idItinerary})//permite hacer referencia a documentos de otras colecciones
    }catch (err) {
        error = err
    }
    res.json({
        response: error ? 'ERROR' : (activity),
        success: error ? false : true,
        error: error
})
   },
   getActivityByItinerary : async(req, res)=>{
    const id= req.params.id
    let activities
    let error =null
    try {
        activities = await Activities.find({city:id})
    } catch (err) {error=err}
    res.json({
        response:error ? 'ERROR':{activities},
        success:error ? false: true,
        error: error
    })
}


}


module.exports = activitiesControllers




