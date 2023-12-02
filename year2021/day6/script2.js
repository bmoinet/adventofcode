// aoc 2021 day 6 script 

const fs = require('fs');
let array = fs.readFileSync('input.txt').toString().split(",").map(item => Number(item))

for (t = 0; t < 5; t++) {
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
    console.log(t, array.length, newend.length)
    
    array = array.concat(newend)
    // plante à t = 147 (RangeError: Invalid array length)
}

console.log('Answer', array.length)