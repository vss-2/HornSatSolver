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
    clausesAux = strAux.split("0")
    
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
  








filename = "hole4.cnf"
filename = "workspace/ic/"+filename;
var text = fs.readFileSync(filename,'utf8');
//console.log(text)

var clauses = readClauses(text)
console.log("clauses =")
console.log(clauses)


