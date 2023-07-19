module.exports = app => {
    const proyecto = require("../controllers/proyecto.controllers");


    // Crear un nuevo usuario
    app.post("/proyecto", proyecto.create);

    //consultar usuarios
    app.get("/proyectos", proyecto.getAll);


};