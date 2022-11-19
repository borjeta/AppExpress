const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const usuarios = require("./routes/usuarios");

let app = express();
app.use(express.urlencoded({ extended: true }));


app.use('/usuarios', usuarios);
mongoose.connect(
  "mongodb+srv://root:root@cluster0.c0tnvrb.mongodb.net/nuevaBaseDatos",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use("/archivospublicos/", express.static(__dirname + "/public"));

// Configuramos motor Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Asignación del motor de plantillas
app.set("view engine", "njk");
app.use(express.json());

app.listen(8080);
