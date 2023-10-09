const sql = require("./db");

// Constructor
const Maestroesfuerzo = function(maestroesfuerzo) {
    this.total_horas_hombre_dev = maestroesfuerzo.total_horas_hombre_dev;
    this.id_proyecto = maestroesfuerzo.id_proyecto;
}

Maestroesfuerzo.create = (maestroesfuerzoNuevo, result) => {
    sql.query("INSERT INTO Maestroesfuerzo SET ?", maestroesfuerzoNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Maestroesfuerzo creado: ", { id: res.insertId, ...maestroesfuerzoNuevo });
        result(null, { id: res.insertId, ...maestroesfuerzoNuevo });
    });

};

Maestroesfuerzo.getAll = result => {
    sql.query("SELECT * FROM maestroesfuerzo", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Maestroesfuerzo", res);
        result(null, res);
    });
};
module.exports = Maestroesfuerzo;
//Maestroesfuerzo.getOnee = (id) => {
  //  return new Promise((resolve, reject) => {
   //     sql.query(`SELECT * FROM tamanio WHERE id_tamanio = ${id}`, (err, res) => {
   //         if (err) {
   //             reject(err);
    //        }
     //       resolve(res);
   //     });
  //  });
//}

//Maestroesfuerzo.getConsultByIdProyect = (id, result) => {

  //  sql.query(`SELECT * FROM maestroesfuerzo WHERE id_proyecto = ?`, [id], (err, res) => {
    //    if (err) {
      ///      console.log("error", err);
       //     result(err, null);
         //   return;
     //   }
       // result(null, res[0]);
   // });
//};


//Maestroesfuerzo.getTwoo = (id) => {
  //  return new Promise((resolve, reject) => {
    //    sql.query(`
      //                      SELECT * FROM esfuerzopivote WHERE id_tamanio = $ { id }
          //                  `, (err, res) => {
        //    if (err) {
            //    reject(err);
  //          }
    //        resolve(res);
      //  });
    //});
//}

//Maestroesfuerzo.updateById = (horas, id, result) => {

   // sql.query(
     //   "UPDATE maestroesfuerzo SET total_horas_hombre_dev = ? WHERE id_maestroesfuerzo = ?;", [horas, id],
       // (err, res) => {
         //   if (err) {
           //     result(null, err);
             //   return;
          //  }
            //if (res.affectedRows == 0) {
          //      result({ kind: "No_Encontrado" }, null);
            //    return;
          //  }
          // result(null, { usuario: res });
      //  }
   // );
//}

