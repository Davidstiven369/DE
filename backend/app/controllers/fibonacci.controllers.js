const Fibonacci = require("../models/fibonacci.models");

//Obtener todos los usuarios
// =======================================
exports.get = (req, res) => {
    Fibonacci.get((err, fibonacci) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuarios',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                fibonacci: fibonacci,
            })
        }
    });
};

// Crear un nuevo usuario

exports.create = (req, res) => {

    var body = req.body;
     

    const fibonacci = new Fibonacci({
        id_fibonacci: body.id_fibonacci,
        
    });
      console.log(fibonacci)

     
      Fibonacci.create(fibonacci, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "rellenar todos los campos",
                errors: err
              });
          } else {
              res.status(201).json({
                  ok: true,
                  fibonacci
              });
          }
      }); 
}