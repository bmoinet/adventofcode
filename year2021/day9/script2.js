// aoc 2021 day 9 script 2

const fs = require('fs');
let array = fs.readFileSync('example.txt').toString().split("\n")
//console.log('Array', array)

const width = array[0].length
const height = array.length
let matrix = new Array(height).fill(0).map(() => new Array(width).fill(0))

for (i = 0; i < height; i++) {
    let line = array[i].split('')
    for (j = 0; j < width; j++) {
        matrix[i][j] = { val: Number(line[j]), low: false }
    }
}
//console.table(matrix)
//process.exit()

let reg = -1

// low points
for (i = 0; i < height; i++) {
    let line = array[i].split('')
    for (j = 0; j < width; j++) {

        const up = (i - 1) >= 0 ? (i - 1) : null
        const down = (i + 1) <= (height - 1) ? (i + 1) : null
        const left = (j - 1) >= 0 ? (j - 1) : null
        const right = (j + 1) <= (width - 1) ? (j + 1) : null

        let low = true

        if (up != null && matrix[up][j].val <= matrix[i][j].val) {
            low = false
            continue
        }
        if (down != null && matrix[down][j].val <= matrix[i][j].val) {
            low = false
            continue
        }
        if (left != null && matrix[i][left].val <= matrix[i][j].val) {
            low = false
            continue
        }
        if (right != null && matrix[i][right].val <= matrix[i][j].val) {
            low = false
            continue
        }

        matrix[i][j].low = low
        matrix[i][j].reg = ++reg
    }
}




console.log('Answer', matrix)