module.exports = app => {
    const maestroesfuerzo = require("../controllers/maestroesfuerzo.controllers");


    // Crear un nuevo maestro esfuerzo 
    app.post("/maestroesfuerzo", maestroesfuerzo.create);

    //consultar maestro esfuerzos
    app.get("/maestroesfuerzos", maestroesfuerzo.getAll);

};