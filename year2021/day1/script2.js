// aoc 2021 day 1 script 2

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

//console.table(array)
//console.log('Array (%s)\n', array.length)
//process.exit()

const total = array.reduce(function(acc, elt, idx, arr) {

    const   prev = Number(arr[idx-1]) + Number(elt) + Number(arr[idx+1]),
            curr = Number(elt) + Number(arr[idx+1]) + Number(arr[idx+2])
            incr = Number(curr) > Number(prev) ? 1 : 0
    
    //console.log(idx, acc, prev, curr, incr)

    return acc + incr
}, 0)

console.log('\nTotal', total)