const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerification = require('./sendVerification');
const crypto = require('crypto');

const usersControllers = {
    signUp : async (req,res) => {
        const { fullName , email, password, photo,country, from} = req.body.userData
        try{
            const usuarioExiste = await User.findOne({ email })//buscamos por mail
            const verification= false
            const uniqueString = crypto.randomBytes(15).toString('hex')//utilizando los metodos de crypto
            if (usuarioExiste)    {
                if(usuarioExiste.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from:from,
                        message:"You are already signUp from this email, please signIn",
    
                    })
                } else {
                    const contraseñaHasheada = bcryptjs.hashSync(password, 10);
                    usuarioExiste.from.push(from); //agregamos datos
                    usuarioExiste.verification = true;
                    usuarioExiste.password.push(contraseñaHasheada)
                    res.json({
                        success:true,
                        from: from,
                        message: "Add " + from + " to your ways to singIn"
                    })
                }
            } else {
                const contraseñaHasheada = bcryptjs.hashSync(password, 10)//si no exite el usuario entra aqui
                const nuevoUsuario = await new User({
                    fullName,
                    email,
                    password: [contraseñaHasheada],
                    photo,
                    country,
                    verification,
                    uniqueString: uniqueString,
                    from:[from]
                    
                }) 
                console.log(nuevoUsuario)
                if (from !== "form-SignUp"){
                    nuevoUsuario.verification = true;
                    await nuevoUsuario.save()
                   
                    
                    res.json({
                        success:true,
                        from: from,
                        message:`You just signed up by ${from}`
    
                    })
                    console.log(nuevoUsuario)
                }else {
                    //  nuevoUsuario.verification = true;
                    await nuevoUsuario.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        messagge:"We send you an email to verify",
                    })
                }
            }
        
        } catch (error) {
            res.json ({success: false, from: from, message: "error,please try again later",console:console.log(error)})
    } 

    },
//     signIn: async (req, res) =>{
//         const {email, password, from} = req.body.userLoged
//         try{
//             const userExist = await User.findOne({email})
//             // const indexPass = userExist.from.indexOf(from)
//             if(!userExist){
//                 res.json({success: false, message: "Your user has not been registered,"})
//             }
//             else
//             {
//                 if(from !== "form-SignIn" ){
//                 let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
//                 if (passwordMatch.length > 0){
//                     const userLoged = {
//                         id: userExist._id,
//                         fullName: userExist.fullName,
//                         email: userExist.email,
//                         photo:userExist.photo,
//                         country: userExist.country,
//                         from: userExist.from,
//                     }
//                     await userExist.save()
//                     const token = jwt.sign({...userLoged}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
//                     res.json({
//                         success: true,
//                         from: from,
//                         response: {token,userLoged},
//                         message:`Welcome back ${userLoged.fullName}`,

//                     })
//                 } 
//                 else {
//                     res.json({
//                         success: false,
//                         from: from,
//                         message: "You did not register with " + "if you want to enter with this method please Sign Up with " + from
//                     })
                
//             } }  
//             else{
//                 let passwordMatch = userExist.password.filter(pass=> bcryptjs.compareSync(password, pass))
//                 if(passwordMatch.length > 0){
//                     const userLoged = {
//                         id: userExist._id,
//                         fullName: userExist.fullName,
//                         email: userExist.email,
//                         photo:userExist.imageUser,
//                         country: userExist.country,
//                         from: from,
//                     }
//                     await userExist.save()
//                     const token = jwt.sign({...userLoged}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
//                     res.json({
//                         success: true,
//                         from: from,
//                         response: {token,userLoged},
//                         message: `Welcome back ${userLoged.fullName}!`,
                    
//                 })
//                 } else{
//                     res.json({
//                         success: false,
//                         from: from,
//                         message: "the username or password does not match"
//                     })
//                 }
//             }
//         }
//     } catch (error) {
//         res.json({ success: false, message: "Something went wrong. Try again in a few seconds", console:console.log(error)})

//     }
// },
signIn: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    try {
      const userExist = await User.findOne({ email }); //buscamos por email
      //const indexPass = userExist.from.indexOf(from);
      if (!userExist) {
        res.json({//si no existe el usuario
          success: false,
          from: "no from",
          message: "user does not exist, please signup",
        });
      } else if (userExist.verification) { //si existe la verificacion del usuario
        let passwordMatch = userExist.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );
          //filtramos en el array de contraseñas hasheadas si coincide la contraseña
          if (from === "form-Signup") {
            if(passwordMatch.length > 0){
              const userData = {
                id: userExist._id,
                fullName: userExist.fullName,
                email: userExist.email,
                photo: userExist.photo,
                country: userExist.country,
                from: userExist.from,
            };
            await userExist.save(); //sing es un metodo:firma una secuencia de comandos almacenada en una cadena
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 1000 * 60 * 60 * 24,
            });
            //console.log(token)
            res.json({
              response: { token, userData },//llega a userAction
              success: true,
              from: from,
              message: "Welcome " + userData.fullName,
            });
          }else {
          //si no hay coincidencias
            res.json({
              success: false,
              from: from,
              message:`verify your password!`,
            });
          }
        }else {
          //si fue registrado por redes sociales
          
          if (passwordMatch.length > 0) {//*borre el >= //hay coincidencias
            const userData = {
              id: userExist._id,
              fullName: userExist.fullName,
              email: userExist.email,
              // password: userExist.password,
              photo: userExist.photo,
              country: userExist.country,
              from: userExist.from,
            };
            await userExist.save();
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 1000 * 60 * 60 * 24,
            });
            res.json({
              response: { token, userData },//llega a userAction
              success: true,
              from: from,
              message: "Welcome back" + userData.fullName,
            });
          } else {
            //si no hay coincidencias
            res.json({
              success: false,
              from: from,
              message: 'verify your mail or password!'
            });
          }
        }
      }else { 
         //si está registrado PERO el usuario NO FUE VALIDADO
        res.json({
          success: false,
          from: from,
          message: `validate your account`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        from:from,
        message: "Something went wrong. Try again in a few seconds",
        
      });
    }
  },

verifyMail: async(req, res) => {
    const {string} = req.params
    const user = await User.findOne({uniqueString: string})
    if(user) {
        user.verification = true

        await user.save()
        res.redirect("http://localhost:3000")
    }
    else { res.json({
        success: false,
        message: "email has not account yet!" 
    }
    
    )
}
},
signOut: async (req, res) => {
const {email} = req.body
const user = await  User.findOne({email})
await user.save()
res.json({
    success:  true,
    message: email  + "sign out!"
})
},
verifyToken: (req, res) => {
    if(!res.err) {
        res.json({
            success: true,
            response: {
                id: req.user.id,
                fullName: req.user.fullName,
                email: req.user.email,
                photo: req.user.photo,
                from: "token"
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
