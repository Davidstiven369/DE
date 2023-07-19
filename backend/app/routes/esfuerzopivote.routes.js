module.exports = app => {
    const esfuerzopivote = require("../controllers/esfuerzopivote.controllers");


    // Crear un nuevo esfuerzo pivote
    app.post("/esfuerzopivote", esfuerzopivote.create);

    //consultar esfuerzos pivotes
    app.get("/esfuerzopivotes", esfuerzopivote.getAll);

};