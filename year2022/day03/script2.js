// aoc 2022 day 3 script 2

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

function getScore(char) {
    const charRef = char === char.toUpperCase() ? '&' : '`'
    return char.charCodeAt() - charRef.charCodeAt()
}

function getScore3(items) {
    const [first, second, third] = [items[0].split(''), items[1].split(''), items[2].split('')]
    const common = first.filter(value => second.includes(value)).filter(value => third.includes(value))
    return getScore(common[0])
}

let scores = 0
let count = -1
let items = []

array.forEach(function (item, index) {
    count++
    items.push(item)
    if (count === 2) {
        scores += getScore3(items)
        count = -1
        items = []
    }
})

console.log(scores)