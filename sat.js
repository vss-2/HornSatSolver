const fs = require("fs")
const sat = require("./sat_modelo.js")

filename = "hole4.cnf"//change filename here
//filename = "workspace/ic/"+filename//coment this if you can walk by prompt directories

/////////////////just to show the text in the .cnf file///////////
const text = fs.readFileSync(filename,'utf8');
console.log(text)
///////////////////////////////////////////////////////////////////

const t1 = process.hrtime()

const result = sat.solve(filename)

const t2 = process.hrtime()
let milliseconds = (t2[0]-t1[0])*1000 + Math.floor((t2[1]-t1[1])/1000000)

console.log("milliseconds to solve=")
console.log(milliseconds)

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