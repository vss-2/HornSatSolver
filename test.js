var fs = require("fs")

   
   
const sat = require("./sat_modelo.js")


filename = "simple0.cnf"
filename = "workspace/ic/"+filename;
var text = fs.readFileSync(filename,'utf8');
console.log(text)

var result = sat.solve(filename)
console.log(result.isSat)
console.log(result.satisfyingAssignment)