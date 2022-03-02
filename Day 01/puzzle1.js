const fs = require("fs")

let increases = 0;
let previous;

fs.readFileSync('input.txt', 'utf-8')
    .split(/\r?\n/)
    .forEach(function(line) {
        let current = parseInt(line);

        if (previous && previous < current) increases++;
        previous = current;
    }
);

console.log(increases);