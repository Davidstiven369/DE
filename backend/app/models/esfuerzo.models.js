const sql = require("./db");

// Constructor
const Esfuerzo = function(esfuerzo) {
    this.epica = esfuerzo.epica;
    this.hu = esfuerzo.hu;
    this.horas_hombre_dev = esfuerzo.horas_hombre_dev;
    this.id_maestroesfuerzo = esfuerzo.id_maestroesfuerzo;
    this.id_esfuerzopivote = esfuerzo.id_esfuerzopivote
}

Esfuerzo.create = (esfuerzoNuevo, result) => {
    sql.query("INSERT INTO Esfuerzo SET ?", esfuerzoNuevo, (err, res) => {
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
    sql.query("SELECT * FROM esfuerzo", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Esfuerzo", res);
        result(null, res);
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
        sql.query(`SELECT * FROM digitalestimator.tamanio WHERE id_tamanio = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

Esfuerzo.getTwo = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM digitalestimator.esfuerzopivote WHERE id_tamanio = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

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



module.exports = Esfuerzo;