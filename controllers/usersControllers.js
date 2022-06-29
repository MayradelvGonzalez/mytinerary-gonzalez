const User = require('../models/users');
const bcryptjs = require('bcryptjs');


const usersControllers = {
    signUp : async (req,res) => {
        let { fullName , email, photo, password, country, from } = req.body.userData
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
                    re.json({
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
                    uniqueString: crypto.randomBytes(15).toString('hex'),
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
            res.json ({success: false, messege: "error,please try again later"})
    } 

    } 
}


module.exports = usersControllers
