module.exports = app => {
    const disciplina = require("../controllers/disciplina.controllers");


    // Crear una disciplina
    app.post("/disciplina", disciplina.create);

    //consultar disciplinas
    app.get("/disciplinas", disciplina.getAll);

};