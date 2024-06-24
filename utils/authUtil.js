const validateEmail = (email)=>{
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function userDataValidation ({ name,email,username,password }){
    return new Promise((resolve,reject) =>{
        if(!name || !email || !username || !password) reject({message: "Missing Data", missingData: true})

        if(typeof name !== 'string') reject("Name is not String")
        if(typeof email !== 'string') reject("email is not String")
        if(typeof username !== 'string') reject("username is not String")
        if(typeof password !== 'string') reject("password is not String")

        if(!validateEmail(email)) reject({message: "Email is not valid", validateEmail: false})
        if(!validatePassword(password)) reject({
            message: "Password should have a-z, A-Z, 0-9, length >= 8 and special character",
            validatePassword: false,
        })

        resolve()
    })
}

module.exports = userDataValidation