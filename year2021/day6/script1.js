// aoc 2021 day 6 script 1

const fs = require('fs');
let array = fs.readFileSync('input.txt').toString().split(",").map(item => Number(item))

for (t = 0; t < 80; t++) {
    //console.log("After %d days : %s", t, array.join(','))

    let newones = 0
    array = array.map(function (item) {
        if (item === 0) {
            newones++
            return 6
        }
        return --item
    })

    newend = Array(newones).fill(8)
    array = array.concat(newend)
}

console.log('Answer', array.length)