let productDetailsController = {
    detail: function (req, res) {
      res.render("../../views/productos/productDetail")
    },
    creation: function (req, res) {
        res.render("../../views/productos/creacionProducto")
      },
};

module.exports = productDetailsController