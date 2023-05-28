const express = require("express")
const app = express()
const path = require("path")

const publicPath = path.resolve(__dirname, "./public")
app.use(express.static(publicPath))

app.listen(3010, ()=> {
    console.log("Jarvis Iniciado en puerto 3010")
})

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"/views/home.html"))
})

app.get("/Registro", (req, res)=>{
    res.sendFile(path.join(__dirname,"/views/formRegistro.html"))
})

app.get("/Login", (req, res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
})

app.get("/productDetail", (req, res)=>{
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))
})
app.get('/Carrito',(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/carrito.html"))
})
