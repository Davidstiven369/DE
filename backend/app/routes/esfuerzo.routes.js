module.exports = app => {
    const esfuerzo = require("../controllers/esfuerzo.controllers");


    // Crear un nuevo esfuerzo 
    app.post("/esfuerzo", esfuerzo.create);

    //consultar esfuerzos
    app.get("/esfuerzos", esfuerzo.getAll);

};