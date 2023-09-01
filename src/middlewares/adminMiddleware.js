adminMiddleware = module.exports = (req, res, next) => {
  try {
    res.locals.isAdmin = false;
    console.log('req.session.usuarioLogeado',req.session.usuarioLogeado )
    console.log('req.session.admin',req.session.admin )
    if (req.session.usuarioLogeado && req.session.usuarioLogeado.id_perfil === 1) {
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false;
    }console.log(req.session.admin )
    next();
  } catch (error) {
    console.log(error);
  }
};

  