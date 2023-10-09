module.exports = app => {
    const esfuerzopivote = require("../controllers/esfuerzopivote.controllers");
   

    // Crear un nuevo esfuerzo pivote
    app.post("/esfuerzopivote", esfuerzopivote.create);

    //consultar esfuerzos pivotes
    app.get("/esfuerzopivotes", esfuerzopivote.getAll);

   // app.get("/epicahistoriausuario", esfuerzopivote.get);

    //app.get("/epicasPorProyecto/:idProyecto", esfuerzopivote.getEpicasPorProyecto);
    app.get("/epicasPorProyecto/:idProyecto", esfuerzopivote.get);

};