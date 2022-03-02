const fs = require("fs")

const entries = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);


let isSuperset = (sig, num_def) =>
    num_def.every(char => sig.includes(char));

function mapNums(signals) {
    let num_defs = {};

    let len_five = signals.filter(signal => signal.length === 5);
    let len_six = signals.filter(signal => signal.length === 6);

    // 1, 4, 7, 8
    num_defs[1] = signals.find(signal => signal.length === 2);
    num_defs[4] = signals.find(signal => signal.length === 4);
    num_defs[7] = signals.find(signal => signal.length === 3);
    num_defs[8] = signals.find(signal => signal.length === 7);

    // 9 -- only len_six digit that contains "4"
    let idx_num9 = len_six.findIndex(
        signal => isSuperset(signal, num_defs[4]));
    num_defs[9] = len_six.splice(idx_num9, 1).shift();

    // 0 -- only len_six digit that contains "1" aside from 9
    let idx_num0 = len_six.findIndex(
        signal => isSuperset(signal, num_defs[1]));
    num_defs[0] = len_six.splice(idx_num0, 1).shift();

    // 6 -- only len_six digit remaining
    num_defs[6] = len_six.shift();

    // 3 -- only len_five digit that contains "1"
    let idx_num3 = len_five.findIndex(
        signal => isSuperset(signal, num_defs[1]));
    num_defs[3] = len_five.splice(idx_num3, 1).shift();

    // 5 -- only len_five digit containing diff of ("4" - "1")
    let diff = num_defs[4].filter(
        char => !num_defs[1].includes(char));
    let idx_num5 = len_five.findIndex(
        signal => isSuperset(signal, diff));
    num_defs[5] = len_five.splice(idx_num5, 1).shift();

    // 2 -- only len_five digit remaining
    num_defs[2] = len_five.shift();

    return num_defs;
}

let decodeSignal = (num_arr, signal) =>
    num_arr.findIndex(num => num.length === signal.length
        && num.every(digit => signal.includes(digit)));

let outputs = [];

entries.forEach(entry => {
    if (entry === "") return;

    let [signals, output_digits] = entry.split(" | ").map(
        str => str.split(" ").map(pattern => pattern.split("").sort()));
    
    let num_arr = Object.values(mapNums(signals));
    let output = output_digits.reduce(
        (prev, curr) => prev + decodeSignal(num_arr, curr), "");

    outputs.push(parseInt(output));
});

console.log(outputs.reduce((prev, curr) => prev + curr, 0));