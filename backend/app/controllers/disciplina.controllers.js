const Disciplina = require("../models/disciplina.models");

//Obtener todas las disciplinas
// =======================================
exports.getAll = (req, res) => {
    Disciplina.getAll((err, disciplinas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando disciplinas',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                disciplinas: disciplinas,
            })
        }
    });
};


exports.create = (req, res) => {

    var body = req.body;

    // Crear un nueva disciplina
    const disciplina = new Disciplina({
        disciplina: body.disciplina,
    });


    // Guardar tamaño en la base de datos
    Disciplina.create(disciplina, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe ingresar datos tipo texto",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                disciplina: disciplina,
                disciplinatoke: req.disciplina
            });
        }
    });
}