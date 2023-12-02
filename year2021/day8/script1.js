// aoc 2021 day 8 script 1

const fs = require('fs');
let array = fs.readFileSync('input.txt').toString().split("\n")
array = array.map(item => item.split(' | ')[1])
//console.log('Array', array)

const uniqueDigits = [
    { value: '1', digits: 2 },
    { value: '4', digits: 4 },
    { value: '7', digits: 3 },
    { value: '8', digits: 7 }
]

const answer = array.reduce(function (acc, elt) {
    let incr = elt.split(' ').reduce(function (acc2, elt2) {

        let key2 = Number(elt2.length.toString())
        let obj2 = uniqueDigits.find(e => e.digits === key2)
        let incr2 = (obj2 !== undefined) ? 1 : 0

        return acc2 + incr2
    }, 0)

    return acc + incr
}, 0)

console.log('Answer', answer)