const fs = require("fs")

let fish = fs.readFileSync('.\\Day 6\\input.txt', 'utf-8')
            .split(",")
            .map(num => parseInt(num));

for (let i = 0; i < 80; i++) {
    let len = fish.length;
    for (let j = 0; j < len; j++) {
        if (fish[j] === 0) {
            fish[j] = 6;
            fish.push(8);
            continue;
        }

        fish[j] -= 1;
    }
}

console.log(fish.length);