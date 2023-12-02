// aoc 2022 day 4 script 2

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

let score = 0

// return true if array1 and array2 intersect
function inter(array1, array2) {
    return Number(Math.max(Number(array1[0]), Number(array2[0]))) <= Number(Math.min(Number(array1[1]), Number(array2[1])))
}

array.forEach(function (item, index) {
    const array = item.split(',')
    let [array1, array2] = [array[0].split('-'), array[1].split('-')]
    if (inter(array1, array2)) {
        score++
    }
})

console.log(score)