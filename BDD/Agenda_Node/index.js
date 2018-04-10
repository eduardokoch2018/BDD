const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      Operaciones = require('./CRUD.js'),
      mongoose = require('mongoose');


const PORT = 3000
const app = express()

const Server = http.createServer(app)
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Agenda";

// Conectar a DB Mongo
mongoose.connect(url)

// Crear Usuario de Acceso al Sistema
Operaciones.crearUsuario((error, result)=> {
   if (error) console.log(error)
   console.log(result)
})

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/', Routing)
app.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
