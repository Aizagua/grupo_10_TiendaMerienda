adminMiddleware = module.exports = (req, res, next) => {
  try {
    res.locals.isAdmin = false;
    if (req.session.usuarioLogeado && req.session.usuarioLogeado.id_perfil === 1) {
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

  