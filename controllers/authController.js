const User = require("../models/userModel");
const userDataValidation = require("../utils/authUtil");
const bcrypt = require('bcryptjs')

const registerController = async (req, res) => {

    const { name,email,username,password } = req.body

    // console.log(req.body);

    try {
        await userDataValidation({ name,email,username,password })

        // Checking username or email already exits:
        await User.emailAndUserExists({username,email})
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
        })
    }

    try {
        const userObj = new User({name,email,username,password})
        const userDb = await userObj.register()
        console.log("Saved user is >> ",userDb);
        return res.send({
            status: 201,
            message: "User registered successfully",
            data: userDb,
            register: true
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
            error: error,
        })
    }

}

const loginController = async (req, res) => {
    const { loginId, password } = req.body

    if(!loginId || !password) return res.send({status: 400, message: 'Missing Credential'})

    

    try {
        const userDb = await User.findUserWithLoginId({ loginId })
        // console.log("login UserDB > ",userDb);

        const isMatch = await bcrypt.compare(password, userDb.password)

        if(!isMatch){
            res.send({
                status: 400,
                message: "Incorrect password",
            })
        }

        console.log("session is >> ",req.session);
        req.session.isAuth = true
        req.session.user = {
            userId : userDb._id,
            email : userDb.email
        }

        return res.send({
            status: 200,
            message: "User logged in successfully",
            data: userDb,
        })

    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
            error: error,
        })
    }
}

const logoutController = async (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.send({
            status: 500,
            message: "Internal Server Error",
            error: err,
        })
        return res.send({
            status: 200,
            message: "User logged out successfully",
        })
    })
}

module.exports = { registerController, loginController, logoutController }