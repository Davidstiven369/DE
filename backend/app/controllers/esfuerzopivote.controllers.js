const Esfuerzopivote = require("../models/esfuerzopivote.models");
const Tamanio = require("../models/tamanio.models");
const Maestroesfuerzo = require("../models/maestroesfuerzo.models");
const Esfuerzo = require("../models/esfuerzo.models");



//Obtener todos los esfuerzos pivotes
// =======================================
exports.getAll = (req, res) => {
    Esfuerzopivote.getAll((err, esfuerzopivotes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando esfuerzo pivote',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                esfuerzopivotes: esfuerzopivotes,
            })
        }
    });
};

exports.create = async (req, res) => {

    //var body = req.body;
    const {
        epica,
        hu,
        entendimiento,
        disenio,
        codificacion,
        ajustes_sonar,
        ajustes_revision_par,
        pruebas_unitarias,
        pruebas_servicio,
        pruebas_UI,
        documentacion,
        soporte_bugs_SQA,
        soporte_bugs_SQA_cliente,
        soporte_bugs_UAT,
        id_tamanio,
    } = req.body;


    const sumaEsfuerzo = Number(entendimiento) +
        Number(disenio) +
        Number(codificacion) +
        Number(ajustes_sonar) +
        Number(ajustes_revision_par) +
        Number(pruebas_unitarias) +
        Number(pruebas_servicio) +
        Number(pruebas_UI) +
        Number(documentacion) +
        Number(soporte_bugs_SQA) +
        Number(soporte_bugs_SQA_cliente)

    // Crear un nuevo esfuerzo pivote
    const esfuerzopivote = new Esfuerzopivote({
        epica,
        hu,
        entendimiento,
        disenio,
        codificacion,
        ajustes_sonar,
        ajustes_revision_par,
        pruebas_unitarias,
        pruebas_servicio,
        pruebas_UI,
        documentacion,
        soporte_bugs_SQA,
        soporte_bugs_SQA_cliente,
        soporte_bugs_UAT,
        total_esfuerzo_horas_h: sumaEsfuerzo,
        id_tamanio,
    });

    // Guardar esfuerzo pivote en la base de datos
    await Esfuerzopivote.create(esfuerzopivote, (err, data) => {

            if (err)  return res.status(400).json({ ok: false, mensaje: "Debe ingresar el id_usuario y el id_tamanio",});
        
        Tamanio.getConsultId(esfuerzopivote.id_tamanio, (error, tamanio) => {

                if (error) return res.status(400).json({ok: false, mensaje: error,});

            Maestroesfuerzo.getConsultByIdProyect(tamanio.id_proyecto, (falla, maestroesfuerzo) => {

                    if (falla) return res.status(400).json({ok: false, mensaje: error,});
                
                const operacionhorashd = Math.ceil(((tamanio.grado * esfuerzopivote.total_esfuerzo_horas_h)) / 3);
                const esfuerzo = new Esfuerzo({
                    epica,
                    hu,
                    horas_hombre_dev: operacionhorashd,
                    id_maestroesfuerzo: maestroesfuerzo.id_maestroesfuerzo,
                    id_esfuerzopivote: data.id
                })


                Esfuerzo.create(esfuerzo, (fallo,esfuerzoCreado ) => {

                    if (fallo) return res.status(400).json({ok: false, mensaje: "Ocurrio un error al crear un esfuerzo"});

                    Esfuerzo.esfuerzosPorProyecto( maestroesfuerzo.id_proyecto, (err, esfuerzos) => {
                        if (err) return res.status(500).json({ok: false, mensaje: 'Error cargando esfuerzo', errors: fallo });

                        let horas = 0;

                        esfuerzos.map( e => {

                            horas +=  e.horas_hombre_dev
                        })

                        console.log();

                        console.log("TOTAL: " + horas);

                        Maestroesfuerzo.updateById(horas, maestroesfuerzo.id_maestroesfuerzo, (OcurrioError, maestro) => {

                            if (OcurrioError) return res.status(400).json({ok: false, mensaje: "Ocurrio un error al actualizar las horas"});

                            else {
                                res.status(201).json({
                                    ok: true,
                                    msg: "Esfuerzo pivote registrado con exito"
                                })
                            }

                        })

                    });
                    
                });

            })

        });

    });
}