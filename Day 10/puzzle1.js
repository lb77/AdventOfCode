const fs = require("fs")

const lines = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
const match = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
}
const error_scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

let errors = [];

lines.forEach(line => {
    let chunkArr = [];

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '('
            || line[i] === '['
            || line[i] === '{'
            || line[i] === '<')
            chunkArr.push(line[i]);
        else {
            if (match[line[i]] !== chunkArr.pop()) {
                return errors.push(line[i]);
            }
        }
    }
});

console.log(errors.reduce(
    (prev, curr) => prev + error_scores[curr], 0));