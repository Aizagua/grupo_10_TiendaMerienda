let registrocontroller = {
    registroUser: function (req, res) {
      res.render("../../views/users/formRegistro")
    },
    loginUser:function (req,res) {
      res.render("../../views/users/login")
    }
};

module.exports = registrocontroller
