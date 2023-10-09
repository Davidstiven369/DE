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


  //podria ser una forma, o la otra es creando una base de datos para la secuencia fibonacci

  exports.create = (req, res) => {
    var body = req.body;

    const selectedfibu = body.gradoo;

    
  const fibu =[3,5,8,13,21,34,55,89];

  if (fibu.includes(selectedfibu))     {


 

    // Crear un nuevo tamaño
    const tamanio = new Tamanio({
        epica: body.epica,
        hu: body.hu,
        alcance: body.alcance,
        grado: selectedfibu,
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
} else{ return res.status(400).json({
    ok: false,
    mensaje:"el numero selecionado no es valido"
});}}