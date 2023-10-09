const sql = require("./db");

// Constructor
const Disciplina = function(disciplina) {
    this.disciplina = disciplina.disciplina;
}

Disciplina.create = (disciplinaNuevo, result) => {
    sql.query("INSERT INTO Disciplina SET ?", disciplinaNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Disciplina creado: ", { id: res.insertId, ...disciplinaNuevo });
        result(null, { id: res.insertId, ...disciplinaNuevo });
    });

};

Disciplina.getAll = result => {
    sql.query("SELECT * FROM disciplina ", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Disciplina", res);
        result(null, res);
    });
};


module.exports = Disciplina;