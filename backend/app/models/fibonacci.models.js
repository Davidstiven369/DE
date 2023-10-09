const sql = require("./db");


// Constructor
const Fibonacci = function(fibonacci) {
    this.id_fibonacci = fibonacci.id_fibonacci;
  

Fibonacci.create = (fibonacciNuevo, result) => {
    sql.query("INSERT INTO Fibonacci SET ?", fibonacciNuevo, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("fibonacci creado: ", { id: res.insertId, ...fibonacciNuevo });
        result(null, { id: res.insertId, ...fibonacciNuevo });
    });

};

Fibonacci.get = result => {
    sql.query("SELECT * FROM fibonacci", (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        console.log("Fibunacci", res);
        result(null, res);
    });
};
}

module.exports = Fibonacci;