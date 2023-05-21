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