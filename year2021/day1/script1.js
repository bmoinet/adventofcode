// aoc 2021 day 1 script 1

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

//console.table(array)
//console.log('Array (%s)\n', array.length)
//process.exit()

const total = array.reduce(function(acc, elt, idx, arr) {

    const   prev = arr[idx-1]
            incr = Number(elt) > Number(prev) ? 1 : 0

    //console.log(idx, acc, prev, elt, incr)

    return acc + incr
}, 0)

console.log('\nTotal', total)