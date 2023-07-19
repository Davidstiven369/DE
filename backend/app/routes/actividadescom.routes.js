module.exports = app => {
    const actividadescom = require("../controllers/actividadescom.controllers");


    // Crear una nueva actividad complementaria
    app.post("/actividadescom", actividadescom.create);

    //consultar tamaños 
    app.get("/actividadescoms", actividadescom.getAll);

};