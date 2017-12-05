let fs = require("fs")

   
   
const sat = require("./sat_modelo.js")


filename = "simple0.cnf"
filename = "workspace/ic/"+filename;
let text = fs.readFileSync(filename,'utf8');
console.log(text)

let result = sat.solve(filename)
console.log(result.isSat)
console.log(result.satisfyingAssignment)