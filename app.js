const express = require("express")
const app = express()
const path = require("path")

const publicPath = path.resolve(__dirname, "./public")
app.use(express.static(publicPath))

app.set ("view engine", "ejs")
app.set ("views", path.join (__dirname,"./views"))

app.listen(3010, ()=> {
    console.log("Jarvis Iniciado en puerto 3010")
})

app.get("/", (req, res)=>{
    res.render("home")
})

app.get("/Registro", (req, res)=>{
    res.render("users/formRegistro")
})

app.get("/login", (req, res)=>{
    res.render("users/login")
})

app.get("/productDetail", (req, res)=>{
    res.render("productos/productDetail")
})
app.get('/carrito',(req,res)=>{
    res.render("carrito")
})

app.get('/creation',(req,res)=>{
    res.render("creacionProducto")
})