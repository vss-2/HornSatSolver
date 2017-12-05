var fs = require("fs")
const sat = require("./sat_modelo.js")

filename = "simple1"
filename = "workspace/ic/"+filename+".cnf"
//just to show the text in the .cnf file
var text = fs.readFileSync(filename,'utf8');
console.log(text)

var result = sat.solve(filename)
if(result.isSat==false){
  console.log("\nTHIS PROBLEM IS INSATISFIABLE")
}else{
  console.log("SOLUTION = ")
  console.log(result.satisfyingAssignment)
}