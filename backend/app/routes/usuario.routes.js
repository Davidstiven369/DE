module.exports = app => {
    const usuario = require("../controllers/usuario.controllers");


    // Crear un nuevo usuario
    app.post("/usuario", usuario.create);

    //consultar usuarios
    app.get("/usuarios", usuario.getAllUsers);


};