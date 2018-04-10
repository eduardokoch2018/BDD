const Ruta = require('express').Router();
var Modelo = require('./models.js')
var Usuarios = Modelo.Usuarios;
var Eventos = Modelo.Eventos;

var id_user;

//Obtener todos los Eventos del Usuario
Ruta.get('/events/all', function(req, res) {
  Eventos.find({"fk_usuario": id_user}).exec(function(err, doc){
    if (err) {
      res.status(500)
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

// Logueo de Usuario
Ruta.post('/login', function(req, res) {
  let user = req.body.user
  let pass = req.body.pass
  Usuarios.findOne({"email": user}).exec(function(err, doc){
    if (err) {
      res.status(500)
      res.json(err)
    } else {
      if (doc.psw==pass) {
        res.json("Validado")
        id_user = doc.id;
        //req.session.usuario = doc.email
        //req.session.nombre_completo = doc.nombre_completo
      } else {
        res.json("Información de acceso Incorrecta !!!")
        id_user=-1;
      }
    }
  })
})


// Agregar un Evento
Ruta.post('/events/new', function(req, res) {
  let titulo = req.body.title
  let fecha_inicio = req.body.start
  let fecha_finalizacion = req.body.end
  let hora_inicio= req.body.start_hour
  let hora_finalizacion = req.body.end_hour
  let todo_el_dia = req.body.allday

  // Buscar el último registro
  var id=0
  Eventos.find().exec(function(err, doc){
      if (err) {
        res.status(500)
        res.json(err)
      } else {
        for(i=0; i < doc.length; i++) {
          if (parseInt(doc[i].id) > parseInt(id)) {
            id = doc[i].id
          }
        }
        // Incrementar Id
        id += 1
        let registro = new Eventos({"id": id, "fk_usuario": id_user,"titulo":titulo, "fecha_inicio": fecha_inicio,
                           "hora_inicio": hora_inicio,"fecha_finalizacion": fecha_finalizacion,
                           "hora_finalizacion": hora_finalizacion, "dia_completo": todo_el_dia
                         })

        registro.save((error)=> {
          if (error) {
            console.log(error)
            res.status(500)
            res.json({"msg":"Error al Guardar Evento. Intente denuevo !!!"})
          } else {
            console.log("Se Agregó Evento Correctamente ")
            res.json({"msg":"OK"})
          }
        })

      }
  })

})

// Actualizar un Evento
Ruta.post('/events/actualizar', function(req, res) {
  let id = parseInt(req.body.id)
  let fecha_inicio = req.body.start_date
  let fecha_finalizacion = req.body.end_date
  let hora_inicio= req.body.start_hour
  let hora_finalizacion = req.body.end_hour
  // Validar
  if ((id > 0) && (id_user > 0)) {
    var cond = {"id": id}
    var newValores = {  $set: {"fecha_inicio": fecha_inicio, "fecha_finalizacion": fecha_finalizacion,
                      "hora_inicio": hora_inicio, "hora_finalizacion": hora_finalizacion} }
    Eventos.updateOne(cond, newValores).exec(function(err, doc){
      if (err) {
        console.log(err)
        res.status(500)
        res.json({"msg":"Error al Actualizar Evento. Intente denuevo !!!"})
      } else {
        console.log("Se Actualizó Registro ")
        res.json({"msg":"OK"})
      }
    })
  } else {
    res.json({"msg":"Id Registro es Incorrecto. Refresque la Página !!!"})
  }

})


// Eliminar un Evento por su id
Ruta.post('/events/delete/:id', function(req, res) {
  let uid = req.params.id
  //
  Eventos.remove({"id":uid}, (error)=> {
    if (error) {
      console.log(error)
      res.status(500)
      res.json({"msg":"Error al Eliminar Evento !!!"})
    } else {
      console.log("Se Eliminó el Evento ")
      res.json({"msg":"OK"})
    }
  })

})



module.exports = Ruta
