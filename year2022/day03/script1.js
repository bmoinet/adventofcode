// aoc 2022 day 3 script 1

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

function getScore(char) {
    const charRef = char === char.toUpperCase() ? '&' : '`'
    return char.charCodeAt() - charRef.charCodeAt()
}

let score = 0

array.forEach(function (item, index) {
    const array = item.split('')
    const middle = Math.ceil(array.length / 2)
    const [first, second] = [array.splice(0, middle), array.splice(-middle)]
    const common = first.filter(value => second.includes(value))
    score += getScore(common[0])
})

console.log(score)