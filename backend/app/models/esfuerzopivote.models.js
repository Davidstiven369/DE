const sql = require("./db");

// Constructor
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




module.exports = Esfuerzopivote;