const sql = require("./db");

// Constructor
const Esfuerzo = function(esfuerzo) {
    this.epica = esfuerzo.epica;
    this.hu = esfuerzo.hu;
    this.horas_hombre_dev = esfuerzo.horas_hombre_dev;
    this.id_maestroesfuerzo = esfuerzo.id_maestroesfuerzo;
    this.id_esfuerzopivote = esfuerzo.id_esfuerzopivote;
 
    
    
}
  
Esfuerzo.create = (esfuerzoNuevo, result) => {
    sql.query("INSERT INTO  Esfuerzo SET ?", esfuerzoNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Esfuerzo creado: ", { id: res.insertId, ...esfuerzoNuevo });
        result(null, { id: res.insertId, ...esfuerzoNuevo });
    });

};

Esfuerzo.getAll = result => {
    // Primera consulta para seleccionar todos los registros
    sql.query("SELECT * FROM esfuerzo;", (err, res) => {
      if (err) {
        console.log("Error", err);
        result(null, err);
      } else {
        console.log("Esfuerzo", res);
        // Segunda consulta para calcular la suma
        sql.query("SELECT SUM(horas_hombre_dev) AS total FROM esfuerzo;", (err2, res2) => {
          if (err2) {
            console.log("Error", err2);
            result(null, err2);
          } else {
            console.log("Total horas hombre dev", res2);
            const totalHoras = res2[0].total; // se obtiene el valor de 'total' del primer elemento del array
            result(null, { esfuerzo: res, total_horas_hombre_desarrollo: totalHoras }); // pasar el valor de 'total' al resultado
          }
        });
      }
    });
  };
  



Esfuerzo.esfuerzosPorProyecto = (id_proyecto, result) => {
    sql.query("SELECT esfuerzo.horas_hombre_dev, esfuerzo.id_esfuerzo FROM proyecto INNER JOIN tamanio ON proyecto.id_proyecto = tamanio.id_proyecto INNER JOIN esfuerzopivote ON tamanio.id_tamanio = esfuerzopivote.id_tamanio INNER JOIN esfuerzo ON esfuerzopivote.id_esfuerzo_pivote = esfuerzo.id_esfuerzopivote WHERE proyecto.id_proyecto = ?", [id_proyecto], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Esfuerzo", res);
        result(null, res);
    });
};

Esfuerzo.getOne = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM tamanio WHERE id_tamanio = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

Esfuerzo.getTwo = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM esfuerzopivote WHERE id_tamanio = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

module.exports = Esfuerzo;

/* Esfuerzo.getThree = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT SUM(horas_hombre_dev) AS total_horas_hombre_dev FROM digitalestimator.esfuerzo = ${total_horas_hombre_dev}`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
} */



