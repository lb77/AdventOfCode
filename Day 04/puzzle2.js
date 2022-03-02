const fs = require("fs")

let info = fs.readFileSync('.\\Day 4\\input.txt', 'utf-8').split(/\r?\n\n/);
let calls = info.shift().split(',');
let boards = info.map((board => ({
    won: false,
    // Split into ['num1', 'num2', 'num3', ...]
    board: board.split(/[\s\r\n]+/),
    // Separate arr to keep track of marked nums
    markedNums: Array.from({length: 25}, () => false)
})));

let lastCall;

for (let k = 0; k < calls.length; k++) {
    boards.forEach(board => {
        let pos = board.board.indexOf(calls[k]);
        if (pos === -1) return;

        board.markedNums[pos] = true;

        let colStartIndex = pos % 5;
        let rowStartIndex = pos - colStartIndex;

        // Check col for bingo
        let colNums = [];
        for (let i = colStartIndex; i < board.board.length; i += 5) {
            if (board.markedNums[i]) colNums.push(board.board[i]);
        }

        // Check row for bingo
        let rowNums = []
        for (let j = rowStartIndex; j < rowStartIndex+5; j++) {
            if (board.markedNums[j]) rowNums.push(board.board[j]);
        }

        if (colNums.length === 5 || rowNums.length === 5) {
            board.won = true;
        }
    });

    if (boards.length === 1) {
        lastCall = calls[k];
        break;
    }

    boards = boards.filter(board => !board.won);
}

let boardSum = boards[0].board
    .filter((_, i) => !boards[0].markedNums[i])
    .reduce((prev, next) => parseInt(prev) + parseInt(next));
console.log("Last board score: " + parseInt(lastCall)*boardSum);