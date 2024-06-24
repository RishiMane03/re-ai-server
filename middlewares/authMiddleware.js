const isAuth = (req,res,next) =>{
    if(req.session.isAuth){
        next()
    }else{
        return res.send({
            status: 401,
            message: "Session expired, Please login again",
            session: req.session
        })
    }
}

module.exports = { isAuth }