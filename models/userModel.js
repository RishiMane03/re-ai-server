const userSchema = require('../schemas/userSchema')
const bcrypt = require('bcryptjs')

const User = class{
    constructor({username, name, email, password}) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Register:
    register(){
        return new Promise(async (resolve, reject) => {

            const hashedPassword = await bcrypt.hash(this.password, Number(process.env.SALT))

            const userObj = new userSchema({
                username: this.username,
                name: this.name,
                email: this.email,
                password: hashedPassword,
            })

            try {
                const userDb = await userObj.save()
                resolve(userDb)
            } catch (error) {
                reject(error)
            }

        });
    }

    // Function to see if user already exists:
    static emailAndUserExists({username,email}){
        return new Promise(async (resolve, reject) => {
            try {
                const userDb = await userSchema.findOne({
                    $or: [ {email},{username} ]
                })

                if(userDb && email === userDb.email) reject("Email already exists")
                if(userDb && username === userDb.username) reject("Username already exists")

                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    // Login Function
    static findUserWithLoginId({ loginId }){
        return new Promise(async (resolve,reject) =>{
            try {
                const userDb = await userSchema.findOne({
                    $or: [ { email: loginId }, { username: loginId } ]
                }).select("+password")

                // console.log("modle login user >> ", userDb);
                
                if(!userDb) return reject('User Not Found')

                resolve(userDb)

            } catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = User;