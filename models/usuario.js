const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    
    usuario: String,
    password: String,
    edad: Number,
    record_simon: String,
    record_tresenralla: String
});

let Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;
