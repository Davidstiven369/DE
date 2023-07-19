const Actividadescom = require("../models/actividadescom.models");

//Obtener todas las actividades complementarias
// =======================================
exports.getAll = (req, res) => {
    Actividadescom.getAll((err, actividadescoms) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando actividades complementarias',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                actividadescoms: actividadescoms,
            })
        }
    });
};


exports.create = (req, res) => {

    //var body = req.body;
    const {
        actividad,
        id_disciplina,
        pesimista,
        masprobable,
        optimista,
        id_usuario,
    } = req.body;

    const operacioncalculado = Math.ceil((optimista + pesimista + (4 * masprobable)) / 6);



    // Crear un nuevo esfuerzo pivote
    const actividadescom = new Actividadescom({
        actividad,
        id_disciplina,
        pesimista,
        masprobable,
        optimista,
        calculado: operacioncalculado,
        id_usuario,
    });

    // Guardar activiades complementarias en la base de datos
    Actividadescom.create(actividadescom, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe ingresar el id_actividad y el id_usuario",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                actividadescom: actividadescom,
                actividadescomtoke: req.actividadescom
            });
        }
    });
}