const Esfuerzo = require("../models/esfuerzo.models");


//Obtener todos los esfuerzos 
// =======================================
exports.getAll = (req, res) => {
    Esfuerzo.getAll((err, esfuerzos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando esfuerzo',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                esfuerzos: esfuerzos,
            })
        }
    });
};

exports.create = async(req, res) => {

    const {

    } = req.body;


    //const sumatotalhhd = Number()

    const queryResult = await Esfuerzo.getOne(1);
    const firstElemnt = queryResult[0];
    const { grado, epica, hu, id_tamanio, id_usuario } = firstElemnt;


    const queryResult1 = await Esfuerzo.getTwo(1);
    const firstElemnt1 = queryResult1[0];
    const { total_esfuerzo_horas_h } = firstElemnt1;


    const operacionhhd = Math.ceil(((grado * total_esfuerzo_horas_h)) / 3);

    // Crear un nuevo esfuerzo
    const esfuerzo = new Esfuerzo({
        epica: epica,
        hu: hu,
        horas_hombre_dev: operacionhhd,
        id_tamanio: id_tamanio,
        id_usuario: id_usuario
    });



    // Guardar esfuerzo en la base de datos
    Esfuerzo.create(esfuerzo, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe ingresar el id_usuario y el id_tamanio",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                esfuerzo: esfuerzo,
                esfuerzo: req.esfuerzo
            });
        }
    });


}


exports.byProyectos = (req, res) => {

    const id_proyecto = req.params.id;
    let horas = 0;

    Esfuerzo.esfuerzosPorProyecto(id_proyecto, (err, esfuerzos) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontraron datos correspondiente al proyecto',
                errors: err
            });
        } else {
            esfuerzos.map(esfuerzo => {
                horas += esfuerzo.horas_hombre_dev;
            })
            res.status(200).json({
                horas,
                esfuerzos,

            })
        }


    });



}