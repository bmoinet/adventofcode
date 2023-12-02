// aoc 2021 day 7 script 1

const fs = require('fs');
let array = fs.readFileSync('input.txt').toString().split(",").map(item => Number(item))

const fuelMax = Math.max(...array)
let fuelMinVal = fuelMinPos = null

let fuelSum = []
for (f = 0; f < fuelMax; f++) {
    fuelSum[f] = array.reduce(function (acc, val) {
        acc += Math.abs(f - val)
        return acc
    }, 0)

    fuelMinVal = Math.min(...fuelSum)
    if (fuelSum[f] === fuelMinVal) {
        fuelMinPos = f
    }

    //console.log("Pos %d : %d", f, fuelSum[f])
}

//console.log('fuelMinVal, fuelMinPos : ', fuelMinVal, fuelMinPos)
console.log('Answer', fuelMinVal)