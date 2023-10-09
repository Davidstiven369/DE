module.exports = app => {
    const fibonacci = require("../controllers/fibonacci.controllers");


    // Crear un nuevo usuario
    app.post("/fibonacci", fibonacci.create);

    //consultar usuarios
    app.get("/fibonaccis", fibonacci.get);}