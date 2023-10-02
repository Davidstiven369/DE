const sql = require("./db");

// Constructor
const Costeo = function(costeo) {
    this.p_refinamiento = costeo.p_refinamiento;
    this.p_arquitectura = costeo.p_arquitectura;
    this.p_desarrollo = costeo.p_desarrollo;
    this.p_sqa = costeo.p_sqa;
    this.p_Sub_total = costeo.p_Sub_total;
    this.p_sqa = costeo.p_sqa;
    this.p_tolerancia=costeo.p_tolerancia;
    this.p_gerencia=costeo.p_gerencia;
    this.p_valor_hora=costeo.p_valor_hora;
    this.h_desarrollo=costeo.h_desarrollo;
    this.h_arquitectura=costeo.h_arquitectura;
    this.h_refinamiento=costeo.h_refinamiento;
    this.h_sqa=costeo.h_sqa;
    this.h_Sub_total=costeo.h_Sub_total;
    this.h_tolerancia=costeo.h_tolerancia;
    this.h_gerencia=costeo.h_gerencia;
    this.h_total=costeo.h_total;
    this.v_refinamiento=costeo.v_refinamiento;
    this.v_arquitectura = costeo.v_arquitectura;
    this.v_desarrollo = costeo.v_desarrollo;
    this.v_sqa = costeo.v_sqa;
    this.v_Sub_total = costeo.v_Sub_total;
    this.v_tolerancia=costeo.v_tolerancia;
    this.v_gerencia=costeo.v_gerencia;
    this.v_total=costeo.v_total;
 

    
   
   
}




Costeo.create = (costeoNuevo, result) => {
    sql.query("INSERT INTO costeo SET ?", costeoNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("costeo creado: ", { id: res.insertId, ...costeoNuevo });
        result(null, { id: res.insertId, ...costeoNuevo });
    });

};












Costeo.h_desarrollo= (h_desarrollo,result) => {
    sql.query("SELECT SUM(actividadescom.calculado) + IFNULL((SELECT SUM(horas_hombre_dev) FROM esfuerzo), 0) AS h_desarrollo FROM actividadescom WHERE actividadescom.id_disciplina = 4;",h_desarrollo,(err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("h_desarrollo creada",{ h_desarrollo: res.h_desarrollo});
        result(null,{h_desarrollo:res.h_desarrollo});
    });
};



Costeo.h_arquitectura= (h_arquitectura,result) => {
    sql.query("SELECT SUM(calculado) AS h_arquitectura FROM actividadescom WHERE id_disciplina = 3; ",h_arquitectura,(err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("h_arquitectura creada",{ h_arquitectura: res.h_arquitectura});
        result(null,{h_arquitectura:res.h_arquitectura});
    });
};



Costeo.h_refinamiento= (h_refinamiento,result) => {
    sql.query("SELECT SUM(calculado) AS h_refinamiento FROM actividadescom WHERE id_disciplina = 2;",h_refinamiento,(err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("hora_refinamiento creada",{ h_refinamiento: res.h_refinamiento});
        result(null,{h_refinamiento:res.h_refinamiento});
    });
};

Costeo.h_sqa= (h_sqa,result) => {
    sql.query("SELECT SUM(calculado) AS h_sqa FROM actividadescom WHERE id_disciplina = 5",h_sqa,(err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("hora_sqa creada",{ h_sqa: res.h_sqa});
        result(null,{h_sqa:res.h_sqa});
    });
};

Costeo.h_gerencia= (h_gerencia,result) => {
    sql.query("SELECT SUM(calculado) AS h_gerencia FROM actividadescom WHERE id_disciplina = 7",h_gerencia,(err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("hora_gerencia creada",{ h_gerencia: res.h_gerencia});
        result(null,{h_gerencia:res.h_gerencia});
    });
};


Costeo.getAll = result => {
    sql.query("SELECT h_desarrollo, h_arquitectura, h_refinamiento, h_sqa, h_Sub_total, h_tolerancia, h_gerencia, h_total, v_refinamiento, v_arquitectura, v_desarrollo, v_sqa, v_Sub_total, v_tolerancia, v_gerencia, v_total FROM costeo ORDER BY id_costeo DESC LIMIT 1;", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("costeo", res);
        result(null, res);
    });
};



  module.exports = Costeo;


