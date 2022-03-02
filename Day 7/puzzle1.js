const fs = require("fs")

let positions = fs.readFileSync('input.txt', 'utf-8').split(",").map(num => parseInt(num));

function median(values) {
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length/2)];
}

let idealPos = median(positions);
console.log(positions.reduce((prev, curr) => prev + Math.abs(curr - idealPos), 0));