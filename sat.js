const fs = require("fs")
const sat = require("./sat_modelo.js")

filename = "hole5.cnf"//change filename here
//filename = "workspace/ic/"+filename//coment this if you can walk by prompt directories

/////////////////just to show the text in the .cnf file///////////
const text = fs.readFileSync(filename,'utf8');
console.log(text)
///////////////////////////////////////////////////////////////////
console.log("Solving "+filename+"...")

console.time("TIME TO SOLVE")
const result = sat.solve(filename)
console.timeEnd("TIME TO SOLVE")


if(result!=null){
  if(result.isSat==false){
    console.log("\nTHIS PROBLEM IS INSATISFIABLE")
  }else{
    console.log("SOLUTION = ")
    console.log(result.satisfyingAssignment)
  }

}else{
  console.log("\nTHE PROBLEM SPECIFICATION DOESN'T CHECK WITH THE PARAMETERS")
}