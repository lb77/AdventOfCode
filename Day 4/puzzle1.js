const fs = require("fs")

let info = fs.readFileSync('.\\Day 4\\input.txt', 'utf-8').split(/\r?\n\n/);

let calls = info.shift().split(',');
let boards = [];
info.forEach(board => {
    board.split(/\r?\n/)
        .map(row => row.split(/\s+/).filter(num => num.length !== 0))
        .forEach(row => boards.push(...row));
});

let row_matrix = Array.from({length: info.length},
    () => Array.from({length: 5}, () => []));
let col_matrix = Array.from({length: info.length},
    () => Array.from({length: 5}, () => []));

let winning_board;
let winning_row;
let winning_col;
let winning_num;

for (let i = 0; i < calls.length; i++) {
    let j = -1
    while ((j = boards.indexOf(calls[i], j + 1)) >= 0) {
        let boardNum = Math.floor(j / 25);
        let rowNum = Math.floor((j - boardNum * 25) / 5);
        let colNum = j % 5;

        console.log(`j: ${j} -- board: ${boardNum} -- row: ${rowNum} -- col: ${colNum}`);

        row_matrix[boardNum][rowNum].push(calls[i]);
        col_matrix[boardNum][colNum].push(calls[i]);

        if (row_matrix[boardNum][rowNum].length === 5
            || col_matrix[boardNum][colNum] === 5) {
            winning_board = boardNum;
            winning_row = rowNum;
            winning_col = colNum;
            winning_num = calls[i];
            break;
        }
    }

    if (winning_num) {
        console.log(`won! -- ${winning_num}`);
        break;
    }
}

let boardIndex = winning_board*25;
let bingo_board = boards.slice(boardIndex, boardIndex+25);
let marked = [];

for (let k = 0; k < 5; k++) {
    marked.push(...row_matrix[winning_board][k]);
    marked.push(...col_matrix[winning_board][k]);
}

let unmarked = bingo_board.filter(num => !marked.includes(num))
                        .map(num => parseInt(num));
console.log(winning_num * unmarked.reduce((prev, curr) => prev + curr));