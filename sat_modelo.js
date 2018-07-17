/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */

const fs = require("fs")//for file reading


module.exports.solve = function(fileName) {
  var formula = readFormula(fileName)
  if(formula==false){//means that specOk is false
    return null
  }else{
    var result = doSolve(formula.clauses, formula.variables)
    return result // two fields: isSat and satisfyingAssignment
  }
}

function doSolve(clauses, assignment) {
  var isSat = false
  var iter=1
  const n = assignment.length
  var currentVariable
  var currentAtribution//will be the atribution of each variable in one clause
  var clauseTrue, k, t
  const qCases = 1<<n
  while (!isSat && iter<=qCases) {
    clauseTrue=1//true to enter the loop, if continues true, maintain the loop
    k=0
    while(k<clauses.length&& clauseTrue){//for each clause
      clauseTrue = false//will be true if one of the clause's variables is true
      t=0   
      while(t<clauses[k].length && !clauseTrue){//if clauseTrue, go to next clause by breaking this loop
        currentVariable = clauses[k][t]
  
        if(currentVariable>0)
          currentAtribution = assignment[currentVariable-1]
        else
          currentAtribution = !assignment[(-currentVariable)-1]//negation of assignment
  
        if(currentAtribution)//if one of the atributions is 1,the clause is true
           clauseTrue=1
        t++
      }
       
      if(k==clauses.length-1 && clauseTrue){//this means that it reached the last clause and that clause is also True, hence isSat has to be true
        isSat=true
      }//as it reached the last clause, it will break the first for loop anyway
      k++
    }
  //console.log("#cases tested = " + iter)
    if(!isSat){
      //console.log(assignment)
      nextAssignment(assignment)
      iter++
      } 
  }
  
  var result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}

function nextAssignment(currentAssignment) {
    // Receives the current assignment and changes it to the next one
  const tam = currentAssignment.length
  var i=0
  while(currentAssignment[i] && i<tam){
    currentAssignment[i]=0
    i++
  }     
    if(i<tam)//if i>=tam , currentassignmet[i] shall not be created
      currentAssignment[i]=1
  
}
 
function readFormula(fileName) {//return empty clauses and variables if specOk = false
  var text = fs.readFileSync(filename,'utf8') //This is the array containing lines of text extracted from the file. 
  var clauses = readClauses(text)//array containing arrays representing the clauses
  var variables = readVariables(clauses)
  var specOk = checkProblemSpecification(text, clauses, variables)
 
  var result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
    return result
  }else{//in case specOk is false. Error handled in solve function
    return false
  }
}
 
function checkProblemSpecification(text, clauses, variables){//return true if problem specification is valid for the clauses and variables parameters
  var index = text.lastIndexOf('p cnf')//return the last index of 'p' in text (where 'p cnf #vars #clauses' are)
  var str = ""
  while(text[index]!='\n'){
    str+=text.charAt(index)
    index++
  }
  str = str.replace("\r\n","")
  str = str.replace("p cnf ","")
  var varsclaus = str.split(" ")
  const qVars = Number(varsclaus[0])//quantity of variables
  const qClaus = Number(varsclaus[1])//quantity of clauses
  
  if(qClaus==clauses.length && qVars==variables.length)
    return true

  return false
}

function readVariables(clauses){//return variables = [0,0,0,0,0.....0,0,0] with length equals to the maximum absolute value between all variables in the clauses
  var max=0,i,j
  variables = []
  i=0
  while(i<clauses.length){
    j=0
    while(j<clauses[i].length){
      if(Math.abs(clauses[i][j]>max)){
        max = Math.abs(clauses[i][j])
      }
      j++
    }
    i++
  }
  i=1
  while(i<=max){
    variables.push(0)
    i++
  }
  return variables
}

function firstClauseIndex(text){//return first index asociated with the clauses  
  var firstIndex = text.lastIndexOf("p cnf")
  while(text.charAt(firstIndex)!="\n"){
    firstIndex+=1
  }
  return firstIndex+1
}
 
function readClauses (text){//return the array of clauses
  var clauses=[]
  var clausesAux=[]
  var clause = []
  var clauseAux=[]
  const firstIndex = firstClauseIndex(text)
  var strAux = ""
  var i,j
    
  strAux = text.substr(firstIndex)//return everything under p cnf #vars #clauses
  strAux = strAux.replace(/\r\n/g," ")
  clausesAux = strAux.split(" 0")//split the clauses
  i=0
  while(i<clausesAux.length){
    clauseAux = clausesAux[i].split(" ")//here, a clause still have '' elements, these elements will be ignored below at *
    clause = []
    j=0
    while(j<clauseAux.length){
      if(clauseAux[j]!="")// *
        clause.push(Number(clauseAux[j]))
    j++
    }
    if(clause!=[])
      clauses.push(clause)
    i++
  }
  clauses.pop()//this removes an empty array that was at the end of the clauses array (for reasons yet unknown)
  return clauses
}
