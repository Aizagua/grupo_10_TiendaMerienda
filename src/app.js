const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const publicPath = path.resolve(__dirname, "../public")
const session = require('express-session');


let rutaUser = require ("./routes/users");
let rutaHome = require ("./routes/home");
let rutaCarrito = require ("./routes/carrito"); 
let rutaProductos = require ("./routes/products")
app.use(express.static(publicPath))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));



app.use(session({
    secret: 'Nombre del sitio',
    resave: false,
    saveUninitialized: true,
}));

app.set ("view engine", "ejs")
app.set ("views", path.join (__dirname,"../views"))

app.listen(3010, ()=> {
    console.log("Jarvis Iniciado en puerto 3010")
})

app.use (rutaHome);

app.use (rutaUser);

app.use (rutaProductos);

app.use (rutaCarrito);