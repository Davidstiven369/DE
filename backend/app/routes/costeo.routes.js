module.exports = app => {
    const costeo = require("../controllers/costeo.controllers");

    // Crear un nuevo tamaño
    app.post("/costeo",costeo.create);

    //consultar tamaños 
    app.get("/costeos",costeo.getAll);


   // app.get("/geth_desarrollo",costeo.h_desarrollo);
    
};

