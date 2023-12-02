// aoc 2021 day 11 script 2

const fs = require('fs')
let array = fs.readFileSync('input.txt').toString().split("\n")
//console.log('Array', array)

const width = array[0].length
const height = array.length
let matrix = new Array(height).fill(0).map(() => new Array(width).fill(0))

// intialize all octopus
for (i = 0; i < height; i++) {
    let line = array[i].split('')
    for (j = 0; j < width; j++) {
        matrix[i][j] = {
            value: Number(line[j]),
            flashed: false
        }
    }
}

displayMatrix(matrix, 0, 0)
//process.exit()

let step = 0
let sumx = null
do {
    step++;

    // update current and adjacent octopus
    for (i = 0; i < height; i++) {
        let line = array[i].split('')
        for (j = 0; j < width; j++) {
            updateOctopus(i, j, 0)
        }
    }

    // reset 'flashed' after step
    for (i = 0; i < height; i++) {
        let line = array[i].split('')
        for (j = 0; j < width; j++) {
            matrix[i][j].flashed = false
        }
    }

    sumx = sumMatrixOctopus(matrix)

    displayMatrix(matrix, step, sumx)
} while (sumx !== 0)


function updateOctopus(i, j, depth) {

    if (matrix[i][j].flashed === true) {
        return
    }

    matrix[i][j].value++

    //const ident = ' '.repeat(d * 3)
    //console.log("%sOctopus %d,%d ++ =>", ident, i, j, matrix[i][j].value)

    if (matrix[i][j].value <= 9) {
        return
    }

    // octopus is flashing
    matrix[i][j].flashed = true
    matrix[i][j].value = 0

    //console.log("%sOctopus %d,%d ++ =>", ident, i, j, matrix[i][j].value, '************************************************')

    const up = (i - 1) >= 0 ? (i - 1) : null
    const down = (i + 1) <= (height - 1) ? (i + 1) : null
    const left = (j - 1) >= 0 ? (j - 1) : null
    const right = (j + 1) <= (width - 1) ? (j + 1) : null

    // depth call (recursion)
    depth++

    // straight
    if (up != null) {
        updateOctopus(up, j, depth)
    }
    if (down != null) {
        updateOctopus(down, j, depth)
    }
    if (left != null) {
        updateOctopus(i, left, depth)
    }
    if (right != null) {
        updateOctopus(i, right, depth)
    }

    // diagonal
    if (up != null && left != null) {
        updateOctopus(up, left, depth)
    }
    if (up != null && right != null) {
        updateOctopus(up, right, depth)
    }
    if (down != null && left != null) {
        updateOctopus(down, left, depth)
    }
    if (down != null && right != null) {
        updateOctopus(down, right, depth)
    }
}

function displayMatrix(matrix, step, sumx) {
    console.log('\nAfter step %d : %d', step, sumx)
    
    if (sumx !== 0) {
        return
    }

    for (i = 0; i < height; i++) {
        let line = array[i].split('')
        let str = ''
        for (j = 0; j < width; j++) {
            str += matrix[i][j].value //+ '[' + matrix[i][j].flash + ']' + ' '
        }
        console.log('%s', str)
    }
    console.log('\n')
}

function sumMatrixOctopus(matrix) {
    let sumx = matrix.reduce(function (acc1, line) {
        return acc1 + line.reduce(function (acc2, col) {
            return acc2 + col.value
        }, 0)
   }, 0)

    return sumx
}

console.log('Answer', step)