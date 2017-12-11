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
  var clauseTrue
  const qCases = Math.pow(2,n)
  while ((!isSat) && iter<=qCases) {
    clauseTrue=1//true to enter the loop, if continues true, maintain the loop
    for(var k=0;k<clauses.length&&clauseTrue==1;k++){//for each clause
      clauseTrue = false//will be true if one of the clause's variables is true
       
      for(var t=0;t<clauses[k].length&&clauseTrue==0;t++){//if clauseTrue, go to next clause by breaking this loop
        currentVariable = clauses[k][t]
  
        if(currentVariable>0)
          currentAtribution = assignment[currentVariable-1]
        else
          currentAtribution = (assignment[(-1)*(currentVariable)-1] +1)%2//negation of assignment
  
        if(currentAtribution)//if one of the atributions is 1,the clause is true
           clauseTrue=1
      }
       
      if(k==clauses.length-1 && clauseTrue==1){//this means that it reached the last clause and that clause is also True, hence isSat has to be true
        isSat=true
      }//as it reached the last clause, it will break the first for loop anyway
  
    }
  //console.log("#cases tested = " + iter)
    if(!isSat){
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
        
  if(currentAssignment[0]==0){
    currentAssignment[0]=1
    return
  }else{
    var i = 0
    while(currentAssignment[i]==1){
      currentAssignment[i]=0
      i++
    }//here, currentassigment[i]==0 or doesn´t exists

    if(i<=tam-1)//if i>=tam , currentassignmet[i] shall not be created
      currentAssignment[i]=1
  }
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
  var max=0
  variables = []
  for(var i=0;i<clauses.length;i++){
    for(var j=0;j<clauses[i].length;j++){
      if(Math.abs(clauses[i][j]>max)){
        max = Math.abs(clauses[i][j])
      }
    }
  }
  for(var i = 1;i<=max;i++)
    variables.push(0)
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
    
  strAux = text.substr(firstIndex)//return everything under p cnf #vars #clauses
  strAux = strAux.replace(/\r\n/g," ")
  clausesAux = strAux.split(" 0")//split the clauses
  for(var i = 0; i<clausesAux.length;i++){
    clauseAux = clausesAux[i].split(" ")//here, a clause still have '' elements, these elements will be ignored below at *
    clause = []
    for(var j = 0; j<clauseAux.length;j++){
      if(clauseAux[j]!="")// *
        clause.push(Number(clauseAux[j]))
    }
    if(clause!=[])
      clauses.push(clause)
  }
  clauses.pop()//this removes an empty array that was at the end of the clauses array (for reasons yet unknown)
  return clauses
}
