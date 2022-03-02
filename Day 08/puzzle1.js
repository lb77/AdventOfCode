const fs = require("fs")

let outputs = fs.readFileSync('input.txt', 'utf-8')
                .split(/\r?\n/)
                .map(line => line.split(" | ")[1]);

let sum = 0;
outputs.forEach(output => {
    if (!output) return;

    sum += output.split(" ")
                .filter(signal => signal.length === 2   // 1
                    || signal.length === 3              // 7
                    || signal.length === 4              // 4
                    || signal.length === 7)             // 8
                .length;
});

console.log(sum);