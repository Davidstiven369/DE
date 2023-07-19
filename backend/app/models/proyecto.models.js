const sql = require("./db");

// Constructor
const Proyecto = function(proyecto) {
    this.nombre_proyecto = proyecto.nombre_proyecto;
    this.id_usuario = proyecto.id_usuario;
}

Proyecto.create = (proyectoNuevo, result) => {
    sql.query("INSERT INTO Proyecto SET ?", proyectoNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Proyecto creado: ", { id: res.insertId, ...proyectoNuevo });
        result(null, { id: res.insertId, ...proyectoNuevo });
    });

};

Proyecto.getAll = result => {
    sql.query("SELECT * FROM proyecto", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Proyecto", res);
        result(null, res);
    });
};

Proyecto.getconsultbyid = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM proyecto WHERE id_proyecto = LAST_INSERT_ID() `, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}


module.exports = Proyecto;