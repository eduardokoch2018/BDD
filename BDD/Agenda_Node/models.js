var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: {type:Number, required: true},
  nombre_completo: {type:String, required: true},
  psw: {type:String, required: true},
  email: {type:String, required: true},
  fecha_nacimiento: {type:Date, required: true}
})

var eventosSchema = new Schema({
  id: {type:Number, required: true},
  fk_usuario: {type:Number, required: true},
  titulo: {type:String, required: true},
  fecha_inicio: {type:Date, required: true},
  hora_inicio: {type:String, required: false},
  fecha_finalizacion: {type:Date, required: false},
  hora_finalizacion: {type:String, required: false},
  dia_completo: {type:Boolean, required: true}
})


var Usuarios = mongoose.model('users', userSchema);
var Eventos = mongoose.model('eventos', eventosSchema);
module.exports = {"Usuarios": Usuarios, "Eventos": Eventos}
