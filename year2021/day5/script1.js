// aoc 2021 day 5 script 1

// load datas
const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n")
const size = 1000

// keep only hz/vr lines 
const regex = /^(\d+),(\d+) -> (\1),(\d+)$|^(\d+),(\d+) -> (\d+),(\6)$/

// create empty matrix
let matrix = new Array(size).fill(0).map(() => new Array(size).fill(0))

// loop into datas
array.map(function (entry, index) {

    const match = entry.match(regex)
    if (match !== null) {
        if (typeof match[1] === 'undefined') { // y1 = y2
            let [x1, y1, x2] = [Number(match[5]), Number(match[6]), Number(match[7])]
            if (x1 > x2) [x1, x2] = [x2, x1]

            for (let x = x1; x < (x2 + 1); x++) {
                matrix[x][y1]++
                //console.log('Match y1=y2 (ligne %d) : x, y, v = %d, %d, %d', index, x, y1, matrix[x][y1])
            }
        } else { // x1 = x2
            let [x1, y1, y2] = [Number(match[1]), Number(match[2]), Number(match[4])]
            if (y1 > y2) [y1, y2] = [y2, y1]

            for (let y = y1; y < (y2 + 1); y++) {
                matrix[x1][y]++
                //console.log('Match x1=x2 (ligne %d) : x, y, v = %d, %d, %d', index, x1, y, matrix[x1][y])
            }
        }
    }

    return
})

let display = ''
for (l = 0; l < size; l++) {
    for (c = 0; c < size; c++) {
        display += (matrix[c][l] === 0 ? '.' : matrix[c][l])
    }
    display += '\n'
}
//console.log('\nMatrix :\n\n%O\n', matrix)
//console.log('\nDisplay :\n\n%s\n', display)

// search overlaps in matrix
overlaps = matrix.flat().reduce(function (acc, value) {
    if (value > 1) acc++
    return acc
}, 0)

console.log('Answer', overlaps)