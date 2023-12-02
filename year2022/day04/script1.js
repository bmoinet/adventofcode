// aoc 2022 day 4 script 1

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

let score = 0

// return true if array2 all inside array1
function inside(array1, array2) {
    return Number(array1[0]) <= Number(array2[0]) && Number(array2[1]) <= Number(array1[1])
}

array.forEach(function (item, index) {
    const array = item.split(',')
    let [array1, array2] = [array[0].split('-'), array[1].split('-')]
    if (inside(array1, array2) || inside(array2, array1)) {
        score++
    }
})

console.log(score)