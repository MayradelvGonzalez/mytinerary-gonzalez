const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerification = require('./sendVerification');
const crypto = require('crypto');

const usersControllers = {
    signUp : async (req,res) => {
        const { fullName , email, password, photo,country} = req.body.userData
        try{
            const usuarioExiste = await User.findOne({ email })//buscamos por mail
           const hashWord = bcryptjs.hashSync(password,10) //hasheo la contraseña

            const verification= false
            const uniqueString = crypto.randomBytes(15).toString('hex')//utilizando los metodos de crypto
            if (usuarioExiste)    {
                if(usuarioExiste.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from:"signup",
                        message:"You are already signUp from this email, please signIn",
    
                    })
                } else {
                    const contraseñaHasheada = bcryptjs.hashSync(password, 10);
                    usuarioExiste.from.push(from); //agregamos datos
                    usuarioExiste.verification = true;
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
                    verification,
                    uniqueString: uniqueString,
                    password: [hashWord],
                    from:[from],
                    
                }) 
                if (from !== "form-SignUp"){
                    await nuevoUsuario.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success:true,
                        from:"signup",
                        message:`Check ${email} to finish your Sign Up`
    
                    })
                }else {
                    nuevoUsuario.verification = true;
                    await nuevoUsuario.save()
                    // await sendVerification(mail, uniqueString)
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
            // const indexPass = userExist.from.indexOf(from)
            if(!userExist){
                res.json({success: false, message: "Your user has not been registred,"})
            }
            else
            {
                if(from !== "form-SignIn" ){
                let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                if (passwordMatch.length > 0){
                    const userLoged = {
                        id: userExist._id,
                        fullName: userExist.fullName,
                        email: userExist.email,
                        photo:userExist.photo,
                        country: userExist.country,
                        from: userExist.from,
                    }
                    await userExist.save()
                    const token = jwt.sign({...userLoged}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                    res.json({
                        success: true,
                        from: from,
                        response: {token,userLoged},
                        message:`Welcome back ${userLoged.fullName}`,

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
                        photo:userExist.imageUser,
                        country: userExist.country,
                        from: from,
                    }
                    await userExist.save()
                    const token = jwt.sign({...userLoged}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                    res.json({
                        success: true,
                        from: from,
                        response: {token,userLoged},
                        message: `Welcome back ${userLoged.fullName}!`,
                    
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
veriifyMail: async(req, res) => {
    const {string} = req.params
    const user = await User.findOne({uniqueString: string})
    if(user) {
        user.verification = true

        await user.save()
        res.redirect("http://localhost:3000/signIn")
    }
    else { res.json({
        success: false,
        message: "email has not account yet!" 
    }
    
    )
}
},
signUp: async (req, res) => {
const {email} = req.body
const user = await  User.findOne({email})
await user.save()
res.json({
    success:  true,
    message: email  + "sign out!"
})
},
verifyToken: (reeq, res) => {
    if(!res.err) {
        res.json({
            success: true,
            response: {
                id: req.user.id,
                fullName: req.user.fullName,
                email: req.user.email,
                photo: req.user.photo,
                from: "tokenn"
            },
            message: "Hi! Welcome back  " + req.user.fullName
        })
    } else {
        res.json({
            success:false,
            message:"sign in please"
        })
    }
}
}



module.exports = usersControllers
