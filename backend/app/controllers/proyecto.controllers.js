const Proyecto = require("../models/proyecto.models");
const Maestroesfuerzo = require("../models/maestroesfuerzo.models");


//Obtener todas los proyectos
// =======================================
exports.getAll = (req, res) => {
    Proyecto.getAll((err, proyectos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando proyectos',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                proyectos: proyectos,
            })
        }
    });
};


exports.create = async(req, res) => {

    var body = req.body;

    const proyecto = new Proyecto({
        nombre_proyecto: body.nombre_proyecto,
        id_usuario: body.id_usuario
    });


    // Guardar proyecto en la base de datos
    await Proyecto.create(proyecto, (err, proyecto) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "error al registrar, verificar datos",
                errors: err
            });
        } else {

            let maestroesfuerzo = new Maestroesfuerzo({ total_horas_hombre_dev: 0, id_proyecto: proyecto.id })

            Maestroesfuerzo.create(maestroesfuerzo, (error, data) => {

                if (error) {

                    return res.status(400).json({
                        ok: false,
                        mensaje: "error al registrar, verificar datos",
                        errors: err
                    });
                }


                res.status(201).json({
                    ok: true,
                    proyecto
                });
            })
        }
    });
}