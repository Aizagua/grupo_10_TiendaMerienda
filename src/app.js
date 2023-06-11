const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.resolve(__dirname, "../public")
let rutaUser = require ("./routes/users");
let rutaHome = require ("./routes/home");
let rutaCarrito = require ("./routes/carrito"); 
app.use(express.static(publicPath))

app.set ("view engine", "ejs")
app.set ("views", path.join (__dirname,"./views"))

app.listen(3010, ()=> {
    console.log("Jarvis Iniciado en puerto 3010")
})

app.use (rutaHome);

app.use (rutaUser);

app.use (rutaCarrito);

app.get("/productDetail", (req, res)=>{
    res.render("productos/productDetail")
})
app.get('/carrito',(req,res)=>{
    res.render("carrito")
})

app.get('/creation',(req,res)=>{
    res.render("productos/creacionProducto")
})