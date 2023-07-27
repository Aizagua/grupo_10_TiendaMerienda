module.exports=(req,res,next)=>{
    try {
        res.locals.isLogged=false;
        if(req.session && req.session.usuarioLogeado ){
            res.locals.isLogged=true;
            res.locals.usuarioLogeado=req.session.usuarioLogeado
        }
        next() 
    } catch (error) {
        console.log(error)
    }
}