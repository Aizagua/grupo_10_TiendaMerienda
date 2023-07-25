const logoutMiddleware = (req, res, next) => {
    
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      next();
    });
  };

  module.exports = logoutMiddleware  