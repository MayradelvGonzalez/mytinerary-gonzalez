const User = require('../models/users');
const bcryptjs = require('bcryptjs');


const usersControllers = {
    signUp : async (req,res) => {
        const { fullName , email, password, photo,country, from } = req.body.userData
        try{
            const usuarioExiste = await User.findOne({ email })
            if (usuarioExiste)    {
                if(usuarioExiste.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from:"signup",
                        message:"You are already signUp from this email, please signIn",
    
                    })
                } else {
                    const contraseñaHasheada = bcryptjs.hashSync(password, 10)
                    usuarioExiste.from.push(from)
                    usuarioExiste.password.push(contraseñaHasheada)
                    res.json({
                        success:true,
                        from:"signup",
                        message: "Add " + from + " to your ways to singIn"
                    })
                }
            } else {
                const contraseñaHasheada = bcryptjs.hashSync(password, 10)
                const nuevoUsuario = await new User({
                    fullName,
                    email,
                    password: [contraseñaHasheada],
                    photo,
                    country,
                    // uniqueString: crypto.randomBytes(15).toString('hex'),
                    emailVerificado: false,
                    from:[from],
                    
                }) 
                if (from !== "form-SignUp"){
                    await nuevoUsuario.save()
                    res.json({
                        success:true,
                        from:"signup",
                        message:"Congratulations,  user created!" + from,
    
                    })
                }else {
                    await nuevoUsuario.save()
                    res.json({
                        success: true,
                        from:"signup",
                        messagge:"We send you an email to verify",
                    })
                }
            }
        
        } catch (error) {
            res.json ({success: false, messagge: "error,please try again later"})
    } 

    },
    signIn: async (req, res) =>{
        const {email, password, from} = req.body.data
        try{
            const userExist = await User.findOne({email})
            const indexPass = userExist.from.indexOf(from)
            if(!userExist){
                res.json({success: false, message: "Your user has not been registred,"})
            }
            else
            {
                if(from !== "form-SignIn" ){
                let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                if (passwordMatch.length > 0){
                    const userData = {
                        id: userExist._id,
                        fullName: userExist.fullName,
                        email: userExist.email,
                        // password: userExist.password,
                        photo:userExist.imageUser,
                        country: userExist.country,
                        from: from,
                    }
                    await userExist.save()
                    res.json({
                        success: true,
                        from: from,
                        response: {userData},
                        message: "Welcome " + userLoged.firstName + userLoged.lastName,

                    })
                } 
                else {
                    res.json({
                        success: false,
                        from: from,
                        message: "You did not register with " + "if you want to enter with this method please Sign Up with " + from
                    })
                
            } }  
            else{
                let passwordMatch = userExist.password.filter(pass=> bcryptjs.compareSync(password, pass))
                if(passwordMatch.length > 0){
                    const userLoged = {
                        id: userExist._id,
                        fullName: userExist.fullName,
                        email: userExist.email,
                        // password: userExist.password,
                        photo:userExist.imageUser,
                        country: userExist.country,
                        from: from,
                    }
                    await userExist.save()
                    res.json({
                        success: true,
                        from: from,
                        response: {userLoged},
                        message: "Welcome " + userLoged.firstName + userLoged.lastName,
                    
                })
                } else{
                    res.json({
                        success: false,
                        from: from,
                        message: "the username or password does not match"
                    })
                }
            }
        }
    } catch (error) {
        res.json({ success: false, message: "Something went wrong. Try again in a few seconds", console:console.log(error)})

    }
},
}



module.exports = usersControllers
