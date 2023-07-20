module.exports = app => {
    const esfuerzo = require("../controllers/esfuerzo.controllers");


    // Crear un nuevo esfuerzo 
    app.post("/esfuerzo", esfuerzo.create);

    //consultar esfuerzos
    app.get("/esfuerzos", esfuerzo.getAll);

    //consultar total horas dev por proyecto
    app.get("/esfuerzos/:id", esfuerzo.byProyectos);

};