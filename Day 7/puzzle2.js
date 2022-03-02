const fs = require("fs")

let positions = fs.readFileSync('input.txt', 'utf-8').split(",").map(num => parseInt(num));

// function median(values) {
//     values.sort((a, b) => a - b);
//     return values[Math.floor(values.length/2)];
// }

let idealPos = Math.floor(positions.reduce((a,b) => a+b) / positions.length);
let diffs = positions.map(pos => Math.abs(pos - idealPos));
let sum = 0;

diffs.forEach(diff => {
    sum += [...Array(diff+1).keys()].reduce((a,b) => a+b, 0);
});

console.log(sum);