

const Esfuerzopivote = require('../models/esfuerzopivote.models');

//const Tamanio = require("../models/tamanio.models");
//const Maestroesfuerzo = require("../models/maestroesfuerzo.models");
// const Esfuerzo = require("../models/esfuerzo.models");

// Obtener epicas por proyecto
// Obtener epicas por proyecto
//exports.getEpicasPorProyecto= (req, res) => {
  //  const id_proyecto = req.params.idProyecto;
    //console.log(id_proyecto)
    // Llama a la función para obtener las epicas por proyecto
  //  Esfuerzopivote.getEpicasPorProyecto(id_proyecto, (err, epicas) => {
//      if (err) {
  ///      return res.status(500).json({
     //     ok: false,
       //   mensaje: 'Error obteniendo epicas por proyecto',
         // errors: err
       // });
     // }
  
//      res.status(200).json({
  //      ok: true,
    //    epicas:epicas
 //     });
//    });
  //};
  
  exports.get = (req, res) => {
    Esfuerzopivote.get(req.params.idProyecto, (err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error obteniendo epica e historia de usuario',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
               result
            });
        }
    });
};

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


exports.create = (req, res) => { 
  var body = req.body;

  
             const epica = body.epica;
             const hu = body.hu;
             const entendimiento = body.entendimiento;
             const disenio = body.disenio;
             const codificacion = body.codificacion;
             const ajustes_sonar = body.ajustes_sonar;
             const ajustes_revision_par = body.ajustes_revision_par;
             const pruebas_unitarias = body.pruebas_unitarias;
             const pruebas_servicio = body.pruebas_servicio;
             const pruebas_UI = body.pruebas_UI;
             const documentacion = body.documentacion;
             const id_tamanio =body.id_tamanio;

             const soporte_bugs_SQAresultado = Math.ceil((( entendimiento + disenio + codificacion + ajustes_sonar + ajustes_revision_par + pruebas_unitarias + pruebas_servicio + pruebas_UI + documentacion) * 0.25) / 0.75);

             const soporte_bugs_SQA_clienteresultado = Math.ceil(( entendimiento + disenio + codificacion + ajustes_sonar + ajustes_revision_par + pruebas_unitarias + pruebas_servicio + pruebas_UI + documentacion + soporte_bugs_SQAresultado) * 0.10);

             const soporte_bugs_UATresultado = Math.ceil(( entendimiento + disenio + codificacion + ajustes_sonar + ajustes_revision_par + pruebas_unitarias + pruebas_servicio + pruebas_UI + documentacion + soporte_bugs_SQAresultado) * 0.05);

             const sumaEsfuerzo = Math.ceil(entendimiento + disenio + codificacion + ajustes_sonar + ajustes_revision_par + pruebas_unitarias + pruebas_servicio + pruebas_UI + documentacion + soporte_bugs_SQAresultado + soporte_bugs_SQA_clienteresultado);
             const epicahistoria =body.epicahistoria;
             const epicas=body.epica
             const id_proyecto=body.id_proyecto
             
    const esfuerzopivote = new Esfuerzopivote({
      epica: epica,
      hu: hu,
      entendimiento: entendimiento,
      disenio: disenio,
      codificacion: codificacion,
      ajustes_sonar: ajustes_sonar,
      ajustes_revision_par: ajustes_revision_par,
      pruebas_unitarias: pruebas_unitarias,
      pruebas_servicio: pruebas_servicio,
      pruebas_UI: pruebas_UI,
      documentacion: documentacion,
      soporte_bugs_SQA: soporte_bugs_SQAresultado,
      soporte_bugs_SQA_cliente: soporte_bugs_SQA_clienteresultado,
      soporte_bugs_UAT: soporte_bugs_UATresultado,
      total_esfuerzo_horas_h: sumaEsfuerzo,
      id_tamanio: id_tamanio,
      epicahistoria:epicahistoria,
      epicas:epicas,
      
      id_proyecto:id_proyecto,
      
      
  });

  Esfuerzopivote.create(esfuerzopivote, (err, data) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              mensaje: "rellenar todos los campos",
              errors: err
          });
      } else {
          res.status(201).json({
              ok: true,
              esfuerzopivote
             
          });
      }
  });
}
//exports.get = (req, res) => {
//    Esfuerzopivote.get((err, epica,hu) => {
  //      if (err) {
    //        return res.status(500).json({
      ////        mensaje: 'Error cargando esfuerzo pivote',
          //      errors: err
   //         });
     //   } else {
       //     res.status(200).json({
         //       ok: true,
           //     epica ,
                
//            })
  //      }
    //});
//};
   
  