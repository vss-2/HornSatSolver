var fs = require("fs")
var a = "hue hueh hue"
for (let i = 1; i <= 10; i++) {
    console.log(i)
}

var text = fs.readFileSync("workspace/ic/hole1.cnf",'utf8')
console.log(text)