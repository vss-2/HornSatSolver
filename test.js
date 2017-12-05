var fs = require("fs")


function firstClauseIndex(text){//return first index asociated with the clauses
    
      var firstIndex = text.lastIndexOf("p cnf")
      while(text.charAt(firstIndex)!="\n"){
        firstIndex+=1
      }
      return firstIndex+1
    }


function readClauses (text){
    var clauses=[]
    var clausesAux=[]
    var clause = []
    var clauseAux=[]
    var firstIndex = firstClauseIndex(text)
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
  
function readVariables(clauses){
    var max=0
    for(var i=0;i<clauses.length;i++){
        for(var j=0;j<clauses[i].length;j++){
            if(Math.abs(clauses[i][j]>max)){
                max = Math.abs(clauses[i][j])
            }
        }
    }
    
    variables = []
    for(var i =1; i<=max;i++)
        variables.push(0)
    return variables
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
    var qVars = Number(varsclaus[0])//quantity of variables
    var qClaus = Number(varsclaus[1])//quantity of clauses
    

    if(qClaus==clauses.length && qVars==variables.length)
        return true

    return false
}

function readFormula(fileName) {
    // To read the file, it is possible to use the 'fs' module. ok
    // Use function readFileSync and not readFile. ok
    // First read the lines of text of the file and only afterward use the auxiliary functions.  ok
  
  
    let text = fs.readFileSync(filename,'utf8') //This is the array containing lines of text extracted from the file. 
    let clauses = readClauses(text)//array containing arrays representing the clauses
    let variables = readVariables(clauses)
    
    // In the following line, text is passed as an argument so that the function
    // is able to extract the problem specification.
  
  
    let specOk = checkProblemSpecification(text, clauses, variables)
  
    let result = { 'clauses': [], 'variables': [] }
    if (specOk) {
      result.clauses = clauses
      result.variables = variables
    }
    return result
  }

  function nextAssignment(currentAssignment) {
    var tam = currentAssignment.length


    if(currentAssignment[0]==0){
      currentAssignment[0]=1
      return
    }else{
      var i = 0
      while(currentAssignment[i]==1){
        currentAssignment[i]=0
        i++
      }
      //here, currentassigment[i]==0
      if(i<=tam-1)
        currentAssignment[i]=1
      return
    }
  }
  function doSolve(clauses, assignment) {
    let isSat = false
    var iter=1
    var n = assignment.length
    var currentVariable
    var currentAtribution//will be the atribution of each variable in one clause
    var clauseTrue
    while ((!isSat) && iter<=Math.pow(2,n)) {
        console.log(assignment)
       clauseTrue=1//true to enter the loop, if continues true, maintain the loop
      for(var k=0;k<clauses.length&&clauseTrue==1;k++){//for each clause
       clauseTrue = false//will be true if one of the clause's variables is true
       
       for(var t=0;t<clauses[k].length&&clauseTrue==0;t++){//if clauseTrue, go to next clause by breaking this loop
         currentVariable = clauses[k][t]
 
         if(currentVariable>0)
           currentAtribution = assignment[currentAtribution-1]
         else
           currentAtribution = (assignment[currentAtribution-1] +1)%2//negation of assignment
 
         clauseTrue = clauseTrue || currentAtribution
       }
       
       if(k==clauses.length-1 && clauseTrue==1){//this means that it reached the last clause and that clause is also True, hence isSat has to be true
         isSat=True
       }//as it reached the last clause, it will break the first for loop anyway
 
      }
 
      if(!isSat){
        nextAssignment(assignment)
        iter++
      } 
     }
     let result = {'isSat': isSat, satisfyingAssignment: null}
     if (isSat) {
       result.satisfyingAssignment = assignment
     }
     return result
   }



filename = "simple1.cnf"
filename = "workspace/ic/"+filename;
var text = fs.readFileSync(filename,'utf8');
console.log(text)

var result =readFormula(filename)
var finalResult = doSolve(result.clauses,result.variables)
console.log(finalResult.isSat)
console.log(finalResult.satisfyingAssignment)