const fs = require("fs")

const lines = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
const match = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}
const error_scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
const completion_points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

let errors = [];
let completions = [];

lines.forEach(line => {
    let chunkArr = [];
    let corrupted = false;

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '('
            || line[i] === '['
            || line[i] === '{'
            || line[i] === '<')
            chunkArr.push(line[i]);
        else {
            if (match[line[i]] !== chunkArr.pop()) {
                errors.push(line[i]);
                corrupted = true;
                break;
            }
        }
    }

    if (!corrupted) {
        let completionStr = "", char;
        while (char = chunkArr.pop()) {
            completionStr += match[char];
        }

        if (completionStr !== "") completions.push(completionStr);
    }
});

function calcCompletionScore(str) {
    let total = 0;

    for (let i = 0; i < str.length; i++) {
        total *= 5;
        total += completion_points[str[i]];
    }

    return total;
}

let scores = completions.map(str => calcCompletionScore(str))
    .sort((a,b) => a-b);
console.log(scores[Math.floor(scores.length/2)]);