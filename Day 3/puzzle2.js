const fs = require("fs")
const NUMBER_LENGTH = 12;

let report = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
let oxygen = report, co2 = report;

for (let i = 0; i < NUMBER_LENGTH; i++) {
    let zeros_oxygen = 0, ones_oxygen = 0;
    let zeros_co2 = 0, ones_co2 = 0;

    // ---- Oxygen ----
    if (oxygen.length > 1) {
        oxygen.forEach(function (num) {
            if (num[i] == 0) return zeros_oxygen++;
            return ones_oxygen++;
        });

        if (ones_oxygen >= zeros_oxygen) {
            oxygen = oxygen.filter((num) => num[i] == 1);
        }
        else {
            oxygen = oxygen.filter((num) => num[i] == 0);
        }
    }

    // ---- CO2 ----
    if (co2.length > 1) {
        co2.forEach(function (num) {
            if (num[i] == 0) return zeros_co2++;
            return ones_co2++;
        });

        if (zeros_co2 <= ones_co2) {
            co2 = co2.filter((num) => num[i] == 0);
        }
        else {
            co2 = co2.filter((num) => num[i] == 1);
        }
    }
}

console.log("oxygen - " + oxygen);
console.log("co2 - " + co2);
console.log(parseInt(oxygen[0], "2") * parseInt(co2[0], "2"));