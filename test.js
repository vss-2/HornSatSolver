var fs = require("fs")

filename = "hole1.cnf"








filename = "workspace/ic/"+filename;
var text = fs.readFileSync("workspace/ic/hole1.cnf",'utf8');
console.log(text)