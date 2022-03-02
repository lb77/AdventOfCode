const fs = require("fs")
const NUMBER_LENGTH = 12;

let report = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
let gamma = "", epsilon = "";

for (let i = 0; i < NUMBER_LENGTH; i++) {
    let zeros = 0;
    let ones = 0;

    report.forEach(function(num) {
        if (num[i] == 0) return zeros++;
        return ones++;
    });

    if (ones >= zeros) {
        gamma += "1";
        epsilon += "0";
    } else {
        gamma += "0";
        epsilon += "1";
    }
}

console.log("gamma - " + gamma);
console.log("epsilon - " + epsilon);
console.log(parseInt(gamma, "2") * parseInt(epsilon, "2"));