// NB: Incomplete, dunno why tbh

const fs = require("fs")

let info = fs.readFileSync('.\\Day 5\\input.txt', 'utf-8').split(/\r?\n/);

let linesMatrix = [];

info.forEach(line => {
    if (line === '') return;

    let coords = line.split(" -> ");
    let [x1, y1] = coords[0].split(",").map(num => parseInt(num));
    let [x2, y2] = coords[1].split(",").map(num => parseInt(num));

    if (x1 === x2) {
        let path = [y1, y2].sort();

        for (let i = path[0]; i <= path[1]; i++) {
            linesMatrix[i] ??= [];

            let num = linesMatrix[i][x1] || 0;
            linesMatrix[i][x1] = ++num;
        }
    } else if (y1 === y2) {
        linesMatrix[y1] ??= [];

        let path = [x1, x2].sort();

        for (let i = path[0]; i <= path[1]; i++) {
            let num = linesMatrix[y1][i] || 0;
            linesMatrix[y1][i] = ++num;
        }
    } else return;
});

let sum = linesMatrix.map(y => y.filter(x => x > 1))
            .reduce((prev, curr) => prev += curr.length, 0);
console.log(sum);
