

// Constructor

//const Epicahistoria = function(epicahistoria){
    
  //this.epicahistoria=epicahistoria.epicahistoria;

//}


//Esfuerzopivote.getEpicasPorProyecto = (id_proyecto, callback) => {
 // const query = `
   // SELECT epica FROM tamanio
  //  WHERE id_proyecto = ?;
  //`;
  
 // sql.query(query, [id_proyecto], (err, results) => {
  //  if (err) {
    //  console.error(err);
//      return callback(err, null);
  //  }

//    const epicas = results.map((row) => row.epica);
//    callback(null, epicas);
//  });
//};
const sql = require("./db");


const Esfuerzopivote = function(esfuerzopivote) {
    this.epica = esfuerzopivote.epica;
    this.hu = esfuerzopivote.hu;
    this.entendimiento = esfuerzopivote.entendimiento;
    this.disenio = esfuerzopivote.disenio;
    this.codificacion = esfuerzopivote.codificacion;
    this.ajustes_sonar = esfuerzopivote.ajustes_sonar;
    this.ajustes_revision_par = esfuerzopivote.ajustes_revision_par;
    this.pruebas_unitarias = esfuerzopivote.pruebas_unitarias;
    this.pruebas_servicio = esfuerzopivote.pruebas_servicio;
    this.pruebas_UI = esfuerzopivote.pruebas_UI;
    this.documentacion = esfuerzopivote.documentacion;
    this.soporte_bugs_SQA = esfuerzopivote.soporte_bugs_SQA;
    this.soporte_bugs_SQA_cliente = esfuerzopivote.soporte_bugs_SQA_cliente;
    this.soporte_bugs_UAT = esfuerzopivote.soporte_bugs_UAT;
    this.total_esfuerzo_horas_h = esfuerzopivote.total_esfuerzo_horas_h;
    this.id_tamanio = esfuerzopivote.id_tamanio;
   
    //this.epicahistoria=esfuerzopivote.epicahistoria;
    //this.epicas.esfuerzopivote.epicas;
  
   
}

Esfuerzopivote.create = (esfuerzopivoteNuevo, result) => {
    sql.query("INSERT INTO Esfuerzopivote SET ?", esfuerzopivoteNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Esfuerzopivote creado: ", { id: res.insertId, ...esfuerzopivoteNuevo });
        result(null, { id: res.insertId, ...esfuerzopivoteNuevo });
    });

};



Esfuerzopivote.getAll = result => {
    sql.query("SELECT * FROM esfuerzopivote", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Esfuerzopivote", res);
        result(null, res);
    });
};

Esfuerzopivote.get = (id_proyecto, result) => {
    sql.query("SELECT epica, hu FROM tamanio WHERE id_proyecto = ? AND grado = (SELECT MIN(grado) FROM tamanio WHERE id_proyecto = ?);", [id_proyecto,id_proyecto],  (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        if (res.length === 0) {
            // cuando no se encuentra ningún resultado, puedo manejarlo aquí
            result(null, { epica: null, hu: null });
        } else {
            console.log("epica e historia creada creada", { epica: res[0].epica, hu: res[0].hu });
            result(null, { res });
            
        }
    });
};

//Esfuerzopivote.get= (epica,hu,result) => {
  //  sql.query("SELECT epica,hu FROM tamanio WHERE id_proyecto = 30 AND grado = (SELECT MIN(grado) FROM tamanio);",epica,hu,(err, res) => {
    //    if (err) {
      //      console.log("Error", err);
        //    result(null, err);

        //  return;
//        }
//
  //      console.log("epica e historia creada creada",{ epica: res.epica,hu:res.hu});
    //    result(null,{epica:res.epica,hu:res.hu});
   // });
//};


module.exports = Esfuerzopivote;