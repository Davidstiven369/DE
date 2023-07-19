module.exports = app => {
    const tamanio = require("../controllers/tamanio.controllers");


    // Crear un nuevo tamaño
    app.post("/tamanio", tamanio.create);

    //consultar tamaños 
    app.get("/tamanios", tamanio.getAll);

};