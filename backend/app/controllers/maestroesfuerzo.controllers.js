const Maestroesfuerzo = require("../models/maestroesfuerzo.models");

//Obtener todos los maestros esfuerzos 
// =======================================
exports.getAll = (req, res) => {
    Maestroesfuerzo.getAll((err, maestroesfuerzos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando maestro esfuerzo',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                maestroesfuerzos: maestroesfuerzos,
            })
        }
    });
};

exports.create = (req, res) => {

    var body = req.body

    const maestroesfuerzo = new Maestroesfuerzo({
        total_horas_hombre_dev: body.total_horas_hombre_dev,
        id_proyecto:body.id_proyecto

    });
    console.log(maestroesfuerzo)

    Maestroesfuerzo.create(maestroesfuerzo, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "falta un dato por validar, revise nuevamente",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                maestroesfuerzo
                
            });
        }
    });



}



    //const queryResult2 = await Maestroesfuerzo.getOnee(1);
    //const firstElemnt2 = queryResult2[0];
    //const { grado } = firstElemnt2;

    //const queryResult3 = await Maestroesfuerzo.getTwoo(1);
    //const firstElemnt3 = queryResult3[0];
    //const { total_esfuerzo_horas_h } = firstElemnt3;

    //const operacionhhd1 = Math.ceil((grado * total_esfuerzo_horas_h) / 3);
    //let resultado = 0;

    //for (let i = 0; i < operacionhhd1; i++) {
        // Lógica dentro del bucle
       // resultado += operacionhhd1;
       // console.log("Iteración: ", i + " Valor de operacionhhd1: " + operacionhhd1);
    //}

    //console.log("Resultado:", resultado);


    // Crear un nuevo esfuerzo
   // const maestroesfuerzo = new Maestroesfuerzo({
     //  total_horas_hombre_dev: operacionhhd1

    //});


   

