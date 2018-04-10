var Modelo = require('./models.js')
var Usuarios = Modelo.Usuarios;

// Crear Usuario de Inicio
module.exports.crearUsuario= function(callback) {
  let EK = new Usuarios({id:1, nombre_completo:"Eduardo Koch Freundt", psw: "12345", email:"eduardo.koch@next-u.com",fecha_nacimiento:"1969-07-22"})
  // Verificar si Existe Usuario
  Usuarios.find({id: 1}).exec((error, result)=>{
    if (error) callback(error)
    else {
      // Si no encontró el primer Id, crea el usuario de inicio
      if (result.length==0) {
        EK.save((error)=> {
          if (error) callback(error)
          callback(null, "Usuario de Inicio Fue Creado !!!")
        })
      }
    }
  })
}
