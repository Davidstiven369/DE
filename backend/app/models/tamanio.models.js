const sql = require("./db");

// Constructor
const Tamanio = function(tamanio) {
    this.epica = tamanio.epica;
    this.hu = tamanio.hu;
    this.alcance = tamanio.alcance;
    this.grado = tamanio.grado;
    this.id_proyecto = tamanio.id_proyecto;
}

Tamanio.create = (tamanioNuevo, result) => {
    sql.query("INSERT INTO Tamanio SET ?", tamanioNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Tamanio creado: ", { id: res.insertId, ...tamanioNuevo });
        result(null, { id: res.insertId, ...tamanioNuevo });
    });

};


Tamanio.getConsultId = (id, result) => {
    sql.query(`SELECT * FROM Tamanio WHERE id_tamanio = ${id} `, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
    });
};


Tamanio.getAll = result => {
    sql.query("SELECT * FROM tamanio", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Tamanio", res);
        result(null, res);
    });
};


module.exports = Tamanio;