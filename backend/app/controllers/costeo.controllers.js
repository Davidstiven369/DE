const Costeo = require("../models/costeo.models");



exports.create = async (req, res) => {
var body = req.body;
console.log(body)

const h_desarrollo = await new Promise((resolve, reject) => {
    Costeo.h_desarrollo((err, h_desarrollo) => {
        if (err) {
            console.error("Error al obtener h_desarrollo:", err);
            return reject(err);
        }
        resolve(h_desarrollo);
    });
});


const h_arquitectura = await new Promise((resolve, reject) => {
    Costeo.h_arquitectura((err, h_arquitectura) => {
        if (err) {
            console.error("Error al obtener h_arquitectura:", err);
            return reject(err);
        }
        resolve(h_arquitectura);
    });
});


const h_refinamiento = await new Promise((resolve, reject) => {
    Costeo.h_refinamiento((err, h_refinamiento) => {
        if (err) {
            console.error("Error al obtener h_refinamiento:", err);
            return reject(err);
        }
        resolve(h_refinamiento);
    });
});


const h_sqa = await new Promise((resolve, reject) => {
    Costeo.h_sqa((err, h_sqa) => {
        if (err) {
            console.error("Error al obtener h_refinamiento:", err);
            return reject(err);
        }
        resolve(h_sqa);
    });
});


const h_gerencia = await new Promise((resolve, reject) => {
    Costeo.h_gerencia((err, h_gerencia) => {
        if (err) {
            console.error("Error al obtener h_gerencia:", err);
            return reject(err);
        }
        resolve(h_gerencia);
    });
});


 const p_refinamiento = body.p_refinamiento/100;
 const p_arquitectura = body.p_arquitectura/100;
 const p_desarrollo = body.p_desarrollo/100;
 const p_sqa=body.p_sqa/100;
 const p_tolerancia = body.p_tolerancia/100;
 const p_gerencia = body.p_gerencia/100;
 const p_valor_hora = body.p_valor_hora;
 const p_Sub_total = (p_refinamiento + p_arquitectura + p_desarrollo + p_sqa);
 const h_desarrollo_value = h_desarrollo && h_desarrollo[0] && h_desarrollo[0].h_desarrollo;
 
 const h_arquitectura_value = h_arquitectura && h_arquitectura[0] && h_arquitectura[0].h_arquitectura;
  
 const resultado = Math.ceil((p_arquitectura * h_desarrollo_value) / p_desarrollo )+ h_arquitectura_value;
 
 const h_refinamiento_value = h_refinamiento && h_refinamiento[0] && h_refinamiento[0].h_refinamiento;
 const resultado1 = Math.ceil((p_refinamiento * h_desarrollo_value) / p_desarrollo) + h_refinamiento_value;

 const h_sqa_value = h_sqa && h_sqa[0] && h_sqa[0].h_sqa;
 const resultado2 = Math.ceil((p_sqa * h_desarrollo_value) / p_desarrollo )+ h_sqa_value;
 const h_Sub_total =h_refinamiento_value + h_arquitectura_value + h_desarrollo_value + resultado2;
 const h_tolerancia = Math.ceil(p_tolerancia*h_Sub_total) ;

 const h_gerencia_value=  h_gerencia && h_gerencia[0] && h_gerencia[0].h_gerencia;
 const h_gerencia1=  Math.ceil((h_Sub_total+h_tolerancia)*p_gerencia) + h_gerencia_value;
 const h_total=h_Sub_total+h_gerencia_value+h_gerencia1+h_tolerancia; 

 const v_refinamiento= p_valor_hora*resultado1;
 
 const v_arquitectura=p_valor_hora*resultado;

 const v_desarrollo=p_valor_hora*h_desarrollo_value;
 
 
 const v_sqa=p_valor_hora*resultado2;
 
 const v_Sub_total=p_valor_hora*h_Sub_total;
 
 const v_tolerancia=p_valor_hora*h_tolerancia;
 
 const v_gerencia=p_valor_hora*h_gerencia1;
 
 const v_total=p_valor_hora*h_total;
 
 


 console.log(p_Sub_total)

 

    const costeo = new Costeo({
    p_refinamiento: p_refinamiento,
    p_arquitectura: p_arquitectura,
    p_desarrollo: p_desarrollo,
    p_sqa: p_sqa,
    p_Sub_total: p_Sub_total,
    p_tolerancia:p_tolerancia,
    p_gerencia:p_gerencia,
    p_valor_hora:p_valor_hora,
    h_desarrollo: h_desarrollo_value,
    h_arquitectura:resultado,
    h_refinamiento:resultado1,
    h_sqa:resultado2,
    h_Sub_total:h_Sub_total,
    h_tolerancia:h_tolerancia,
    h_gerencia:h_gerencia1,
    h_total:h_total,
    v_refinamiento:v_refinamiento,
    v_arquitectura: v_arquitectura,
    v_desarrollo: v_desarrollo,
    v_sqa: v_sqa,
    v_Sub_total: v_Sub_total,
    v_tolerancia:v_tolerancia,
    v_gerencia:v_gerencia,
    v_total:v_total,
    
  

    

      });
             console.log(costeo);

             //creacion objeto costeo base de datos
             Costeo.create(costeo, (err, data) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "rellenar todos los campos",
                        errors: err
                      });
                  } else {
                      res.status(201).json({
                          ok: true,
                          costeo: costeo,
                          costeo: data
                      });
                  }
              });






         
        
   
}; 

// obtener todos 
exports.getAll = (req, res) => {
    Costeo.getAll((err, costeos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando costeos',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                costeos: costeos,
            })
        }
    }); 
}

