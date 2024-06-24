const mongoose = require('mongoose')
const clc = require("cli-color")

mongoose.connect(process.env.MONGO_URI)
.then(()=>{ console.log(clc.bgGreenBright(`DataBase Started`))})
.catch((e)=>{ console.log(clc.white.bgRedBright(`DataBase Error ${e}`))});
