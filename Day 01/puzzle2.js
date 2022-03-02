const fs = require("fs")

let measurements = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
let increases = 0;
let previous;

// -2 to ensure we can get three measurements
for (let i = 0; i < measurements.length-2; i++) {
    let current = parseInt(measurements[i])
        + parseInt(measurements[i+1])
        + parseInt(measurements[i+2]);

    if (previous && previous < current) increases++;
    previous = current;
}

console.log(increases);