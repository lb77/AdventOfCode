const fs = require("fs")

let instructions = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
let horizontal = 0, depth = 0, aim  = 0;

instructions.forEach(function (instr) {
    let arr = instr.split(" ");
    let val = parseInt(arr[1]);

    switch (arr[0]) {
        case "forward":
            horizontal += val;
            depth += aim * val;
            break;
        case "up":
            aim -= val;
            break;
        case "down":
            aim += val;
            break;
        default:
            break;
    }
});

console.log("final depth - " + depth);
console.log("final horizontal - " + horizontal);
console.log(depth*horizontal);