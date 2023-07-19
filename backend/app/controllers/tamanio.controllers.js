const Tamanio = require("../models/tamanio.models");

//Obtener todos los tamaños
// =======================================
exports.getAll = (req, res) => {
    Tamanio.getAll((err, tamanios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando tamanios',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                tamanios: tamanios,
            })
        }
    });
};


exports.create = (req, res) => {

    var body = req.body;

    // Crear un nuevo tamaño
    const tamanio = new Tamanio({
        epica: body.epica,
        hu: body.hu,
        alcance: body.alcance,
        grado: body.grado,
        id_proyecto: body.id_proyecto
    });


    // Guardar tamaño en la base de datos
    Tamanio.create(tamanio, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe ingresar el id_proyecto",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                tamanio,

            });
        }
    });
}