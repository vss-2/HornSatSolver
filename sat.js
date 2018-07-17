const fs = require("fs")
const sat = require("./sat_modelo.js")

filename = "hole4.cnf"//change filename here

console.log("\n\n\nSolving "+filename+"...\n")

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