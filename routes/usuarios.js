const express = require("express");
const Usuario = require(__dirname + "/../models/usuario.js");
let router = express.Router();

//modificar un usuario
router.put("/:id", (req, res) => {
  Usuario.findByIdAndUpdate(req.params.id, req.body)
    .then((resultado) => {
      res.status(200);
      res.redirect("/");
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo usuario" });
      console.log(error);
    });
});
//eliminar un usuario
router.post("/borrarusuario/:id", (req, res) => {
  Usuario.findByIdAndDelete(req.params.id)
    .then((resultado) => {
      res.status(200);
      res.redirect("/usuarios/lista_usuarios");
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo usuario" });
      console.log(error);
    });
});
// Ruta para insertar usuarios aleatorio
router.get("/nuevoRandom/", (req, res) => {
  let nuevoUsuario = new Usuario({
    nombre: "borja",
    password: "1234",
    edad: 20,
    record: 0,
  });
  nuevoUsuario
    .save()
    .then((resultado) => {
      res.redirect("/");
      alert("Usuario creado");
    })
    .catch((error) => {
      res.render("error", { error: "Error añadiendo usuario" });
    });
});
// Ruta para comprobar si el usuario existe
router.get("/fichauser/:id", (req, res) => {
  Usuario.findById(req.params.id)
    .then((resultado) => {
      res.status(200);
      res.render("fichaUsuario", { usuario: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo usuario" });
      console.log(error);
    });
});
router.post("/buscaporid/:id", (req, res) => {
  Usuario.findById(req.params.id)
    .then((resultado) => {
      res.status(200);
      res.render("fichaUsuario", { usuario: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo usuario" });
      console.log(error);
    });
});
// si se accede a la raiz entra directamente en la pagina de inicio
router.get("/login/", (req, res) => {
  res.render("login");
});
router.get("/lista_usuarios/", (req, res) => {
  Usuario.find()
    .then((resultado) => {
      res.status(200);
      res.render("usuarios_listado", { usuarios: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo contactos" });
    });
});
//Get para renderizar el juego
router.get("/simon/", (req, res) => {
  res.render("simon");
});
router.get("/", (req, res) => {
  Usuario.find()
    .then((resultado) => {
      res.status(200);
      res.render("usuarios_listado", { usuarios: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo contactos" });
    });
});
// Ruta para mostrar la tabla de puntos
router.get("/tabladepuntos/", (req, res) => {
  Usuario.find()
    .then((resultado) => {
      res.status(200);
      res.render("tabladepuntos", { usuarios: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo contactos" });
    });
});
//Ruta para borrar un usuario
router.delete("/borrar/:id", (req, res) => {
  Usuario.findByIdAndDelete(req.params.id)
    .then((resultado) => {
      res.status(200);
      res.redirect("/");
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo usuario" });
      console.log(error);
    });
});
// Ruta para modificar un usuario
router.post("/formularioeditarusuario/:id", (req, res) => {
  Usuario.findByIdAndUpdate(req.params.id, req.body)
    .then((resultado) => {
      res.status(200);
      res.render("fichaUsuario", { usuario: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo usuario" });
      console.log(error);
    });
});

//Ruta para redirigir al formulario de editar usuario
router.get("/formularioeditarusuario/:id", (req, res) => {
  res.render("editarusuario");
});
// Ruta para insertar el usuario de usuarionuevo
router.post("/usuarionuevo/", (req, res) => {
  let nuevoUsuario = new Usuario({
    usuario: req.body.usuario,
    password: req.body.password,
    edad: req.body.edad,
    record_simon: "0",
    record_tresenralla: "0",
  });
  nuevoUsuario
    .save()
    .then((resultado) => {
      redirect("/usuarios/lista_usuarios");
      alert("Usuario creado");
    })
    .catch((error) => {
      res.render("error", { error: "Error añadiendo usuario" });
    });
});
// ruta para dirigir a la pagina de registro
router.get("/usuarionuevo/", (req, res) => {
  res.render("usuarionuevo");
});
//Ruta para actualizar el record del usuario en base de datos

//POST DE LOGIN DE USUARIOS
router.post("/login/", (req, res) => {
  Usuario.findOne({ nombre: req.body.nombre })

    .then((resultado) => {
      console.log(resultado.password);
      console.log(req.body.usuario);
      if (
        resultado.password == req.body.password &&
        resultado.nombre == req.body.nombre
      ) {
        res.render("simon", { usuarios: resultado });
      } else {
        res.render("error", { error: "Contraseña incorrecta" });
      }
    })
    .catch((error) => {
      res.render("error", { error: "Usuario no encontrado" });
    });
});

//get del tres en ralla
router.get("/tresenralla/", (req, res) => {
  res.render("tresenralla");
});

module.exports = router;
