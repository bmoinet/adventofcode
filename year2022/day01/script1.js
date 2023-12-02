// aoc 2022 day 1 script 1

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

//console.table(array)
//console.log('Array (%s)\n', array.length)
//process.exit()

let accus = []
let num = -1

array.forEach(function (item, index) {
    if (item === '') {
        num++
        accus[num] = 0
    } else {
        accus[num] += Number(item)
    }
})

const sorted = accus.sort(function (a, b) {
    return b - a
})

console.log(sorted[0]) // 71124