const fs = require("fs")
const sat = require("./sat_modelo.js")

filename = "pieceOfHole6"//change filename here
filename = "workspace/ic/"+filename+".cnf"
//just to show the text in the .cnf file
const text = fs.readFileSync(filename,'utf8');
console.log(text)



const result = sat.solve(filename)
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