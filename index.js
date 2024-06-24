const express = require('express')
const cors = require('cors');
require ('dotenv').config()
const clc = require("cli-color")
const session = require("express-session")
const mongoDbSession = require('connect-mongodb-session')(session)

// file imports
require('./db')
const authRouter = require('./routers/authRouter');
const aiHubRouter = require('./routers/aiHubRouter');

const app = express() 
const PORT = process.env.PORT
const store = new mongoDbSession({
    uri: process.env.MONGO_URI,
    collection:'sessions'
})

// middleware
app.use(cors({
    // origin: 'http://localhost:3000', // Allow requests from this origin
    origin: 'https://re-ai-client.vercel.app/', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use(express.urlencoded({ extended: true }));
// CORS Middleware
const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://re-ai-client.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
// Apply CORS Middleware globally
app.use(corsMiddleware);


// http://localhost:8080/auth/register
app.use("/auth",authRouter)
app.use("/ai",aiHubRouter)

app.get('/home', function (req, res) {
    res.send('Welcome To Ai Website')
})


app.listen(PORT, ()=>{
    console.log(clc.bgGreenBright(`Server listening on ${PORT}`));
})