const fs = require("fs")
const sat = require("./sat_modelo.js")

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var filename = ""

readline.question(`What .cnf file do you want?`, (filename) => {
  console.log("\n\n\nSolving " + filename + "...\n")
  
  console.time("TIME TO SOLVE")
  const result = sat.solve(filename)
  console.timeEnd("TIME TO SOLVE")
  
  if(result!=null){
    if(result.isSat==false){
      console.log("\nTHIS PROBLEM IS INSATISFIABLE")
    } else {
      console.log("SOLUTION = " + result.satisfyingAssignment)
    }
  } else {
    console.log("\nTHE PROBLEM SPECIFICATION DOESN'T CHECK WITH THE PARAMETERS")
  }
  readline.close()
})
