const sql = require("./db");

// Constructor
const Actividadescom = function(actividadescom) {
    this.actividad = actividadescom.actividad;
    this.id_disciplina = actividadescom.id_disciplina;
    this.pesimista = actividadescom.pesimista;
    this.masprobable = actividadescom.masprobable;
    this.optimista = actividadescom.optimista;
    this.calculado = actividadescom.calculado;
    this.id_usuario = actividadescom.id_usuario;
}

Actividadescom.create = (actividadescomNuevo, result) => {
    sql.query("INSERT INTO Actividadescom SET ?", actividadescomNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("Actvidadescom creado: ", { id: res.insertId, ...actividadescomNuevo });
        result(null, { id: res.insertId, ...actividadescomNuevo });
    });

};

Actividadescom.getAll = result => {
    sql.query("SELECT * FROM actividadescom", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Activiadescom", res);
        result(null, res);
    });
};


module.exports = Actividadescom;