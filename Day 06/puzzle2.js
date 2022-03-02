const fs = require("fs")

let fish = fs.readFileSync('.\\Day 6\\input.txt', 'utf-8').split(",");

let fishMatrix = Array(9).fill(0);

// Populate matrix with initial state of fish
fish.forEach(num => {
    fishMatrix[parseInt(num)] += 1;
});

for (let i = 0; i < 256; i++) {
    const newFish = fishMatrix.shift();
    fishMatrix.push(newFish);
    fishMatrix[6] += newFish;
}

let totalFish = fishMatrix.reduce((prev, curr) => prev + curr, 0);
console.log(totalFish);