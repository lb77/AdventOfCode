const fs = require("fs")

let heightmap = fs.readFileSync('input.txt', 'utf-8')
    .split(/\r?\n/)
    .map(line => line.split(""));

function calcBasin(i, j) {
    let acc = [];

    if (heightmap[i][j] == 9 || heightmap[i][j] == '') {
        return acc;
    }

    acc.push(heightmap[i][j]);
    heightmap[i][j] = '';

    // Up
    if (i > 0) acc.push(...calcBasin(i-1, j));

    // Down
    if (i < heightmap.length-1) acc.push(...calcBasin(i+1, j));

    // Left
    if (j > 0) acc.push(...calcBasin(i, j-1));

    // Right
    if (j < heightmap[i].length-1) acc.push(...calcBasin(i, j+1));

    return acc;
}

let low_points = [];
let basins = [];

// Brute force solution: check each and every point
for (let i = 0; i < heightmap.length; i++) {
    let row = heightmap[i];

    for (let j = 0; j < row.length; j++) {
        // Up
        if (i > 0 && heightmap[i-1][j] <= row[j]) continue;

        // Down
        if (i < heightmap.length-1 && heightmap[i+1][j] <= row[j]) continue;

        // Left
        if (j > 0 && row[j-1] <= row[j]) continue;

        // Right
        if (j < row.length-1 && row[j+1] <= row[j]) continue;

        low_points.push({
            i: i,
            j: j,
            val: parseInt(row[j])
        });
    }
}

low_points.forEach(point =>
    basins.push(calcBasin(point.i, point.j)));
basins.sort((a, b) => b.length - a.length);

console.log(basins[0].length * basins[1].length * basins[2].length);