const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerification = require('./sendVerification');
const crypto = require('crypto');

const usersControllers = {
    signUp: async (req, res) => {
        const { fullName, email, password, photo, country, from } = req.body.userData;

        try {
            const userExist = await User.findOne({ email }); //ir a la coleccion y busca el email
            const verification = false; //por default
            const uniqueString = crypto.randomBytes(15).toString("hex"); //utilizo los mÃ©todos de crypto
            if (userExist) {
                if (userExist.from.indexOf(from) !== -1) {
                    //desde donde esta registrado//si el indice de from es cualquier numero que no sea -1 significa que ya existe el usuario y NO DEBEMOS PERMITIRLE volver a registrarse
                    res.json({
                        success: false,
                        from: from,
                        message: `${email} has been registered yet, please Sign In!`,
                    });
                } else {
                    //si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA (nuevo registro con google) pero ya tiene AL MENOS UN registro (facebook y form)
                    const passwordhashed = bcryptjs.hashSync(password, 10);
                    userExist.password.push(passwordhashed);
                    userExist.from.push(from); //agregamos datos
                    userExist.verification = true; //no necesariamente puede estar verificada la cuenta
                    await userExist.save();
                    res.json({
                        success: true,
                        from: from,
                        message: `you are not registered with this account, please Sign Up!`,
                    });
                }
            } else {
                //si no existe el user
                const passwordhashed = bcryptjs.hashSync(password, 10);
                const newUser = await new User({
                    fullName,
                    email,
                    password: [passwordhashed],
                    photo,
                    country,
                    from: [from],
                    uniqueString: uniqueString,
                    verification

                });
                if (from !== "form-SignUp") {
                    //si la data viene de una red social
                    newUser.verification = true; //no es necesario que valide datos
                    await newUser.save();
                    res.json({
                        success: true,
                        from: from,
                        message: `you've just signed up by ${from}! now LOG IN!`,
                    });
                    console.log(newUser);
                } else {
                    //data del form
                    await newUser.save();
                    await sendVerification(email, uniqueString);
                    res.json({
                        success: true,
                        from: from,
                        message: `check ${email} and finish your SIGN UP!`,
                    });
                }
            }
        } catch (error) {
            res.json({
                success: false,
                from: from,
                message: error,
            });
        }
    },
    signIn: async (req, res) => {
        const { email, password, from } = req.body.userLoged;
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
                if (from === "form-SignIn") {
                    if (passwordMatch.length > 0) {
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
                            message: "Welcome " + userData.fullName + "!",
                        });
                    } else {
                        //si no hay coincidencias
                        res.json({
                            success: false,
                            from: from,
                            message: `verify your password!`,
                        });
                    }
                } else {
                    //si fue registrado por redes sociales

                    if (passwordMatch.length > 0) {//hay coincidencia
                        const userData = {
                            id: userExist._id,
                            fullName: userExist.fullName,
                            email: userExist.email,
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
                            message: "Welcome back" + userData.fullName + "🤗",
                        });
                    } else {
                        //si no hay coincidencias
                        res.json({
                            success: false,
                            from: from,
                            message: 'you have not yet registered with this account'
                        });
                    }
                }
            } else {
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
                from: from,
                message: "Something went wrong. Try again in a few seconds please",

            });
        }
    },

    verifyMail: async (req, res) => {
        const { string } = req.params
        const user = await User.findOne({ uniqueString: string })
        if (user) {
            user.verification = true

            await user.save()
            res.redirect("http://localhost:3000")
        }
        else {
            res.json({
                success: false,
                message: "email has not account yet!"
            }

            )
        }
    },
    signOut: async (req, res) => {
        const { email } = req.body
        const user = await User.findOne({ email })
        await user.save()
        res.json({
            success: true,
            message: email + "sign out!"
        })
    },
    verifyToken: (req, res) => {
        if (req.user) {
            res.json({
                success: true,
                response: {
                    id: req.user.id,
                    fullName: req.user.fullName,
                    email: req.user.email,
                    photo: req.user.photo,
                    from: "token"
                },
                message: "Hi! Welcome back  " + " " + req.user.fullName  
            })
        } else {
            res.json({
                success: false,
                message: "Sign In please"  
            })
        }
    },

   likeDislike: async (req, res) =>{
    const id = req.params.id //por parametro desde axios
    const user = req.user.id //por respuesta de passport
    await itineraries.findOne({_id: id})//Busca por id, que viene por parametro, desde el front le paso a la ruta y va a entrar en el controlador
    .then((itinerary) => {
        if(itinerary.likes.includes(user)){
            itineraries.findOneAndUpdate({_id: id}, { $pull: {likes: user}}, { new: true })
            .then((response) => res.json({ success: true, response: response.likes}))
            .catch((error) => console.log(error))
        } else {
            Itineraries.findOneAndUpdate({ _id: id}, {$push: {likes:user}}, { new:true})
            .then((response) => res.json({ success: true, response: response.likes}))
            .catch((error) => console.log(error))
        }
    })//si place.like incluye user (si loincluye es true), va a actualizar el itinerario y hara un pull, extraera el id del usuario del array de likes, y new true me trae el cambio actualizado y luego me da una respuetsa
    .catch((error) => res.json({ success: false, response: error }))
   },
   upload: async (req,res) => {
    const { file } = req.files
    const name = req.body.name
    const city = req.body.city
    const description = req.body.description
    const nameUser = req.user._id
    try {
        const itineraryExist = await Itineraries.findOne({ name })
        if(itineraryExist){
            res.json({
                success: false,
                message: "This itinerary has been added"
            })
        } else {
            const filename =  crypto.randomBytes(10).string('hex')+ '.' + file.name.split(".")[file.name.split("").length - 1];
            const ruta = `` //agregar direccion del filename del itinerary del front
            file.mv(ruta, err => {
                if(err) {
                    console.log(err)
                }
                else {
                    console.log("file charged")
                }
            })
            const newItinerary = await new Itineraries({
                name: name,
                photo: photo,
                city: city,
                description: description,
                nameUser: nameUser
            }

            )
            await newItinerary.save()
            res.json({
                success : true,
                message: "Thanks for adding a value to our place!"
            })
            
    } }catch(error){
        console.log(error)
        res.json({ success: false, message: "something goes wrong, try again in a few minutes"}) //caputura del error
    }


   }
}



module.exports = usersControllers
