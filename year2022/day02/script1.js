// aoc 2022 day 2 script 1

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

function calcLetter(letter) {
    let map = new Map()
    map.set('A', 1)
    map.set('B', 2)
    map.set('C', 3)

    return map.get(letter)
}

function transLetter(letters) {
    let map = new Map()
    map.set('A X', 'C')
    map.set('B X', 'A')
    map.set('C X', 'B')
    map.set('A Y', 'A')
    map.set('B Y', 'B')
    map.set('C Y', 'C')
    map.set('A Z', 'B')
    map.set('B Z', 'C')
    map.set('C Z', 'A')

    return map.get(letters)
}

function calcMatch(letters) {
    console.log(`letters calcMatch: [${letters}]`)
    if (["A Z", "B X", "C Y"].indexOf(letters) >= 0) {
        return 0 // i lost
    }
    if (["A Y", "B Z", "C X"].indexOf(letters) >= 0) {
        return 6 // i won
    }
    return 3 // draw
}

let score = 0

array.forEach(function (item, index) {
    theLetters = item.split(' ')
    let hisLetter = theLetters[0]
    let myLetter = transLetter(item)
    scoreLetter = calcLetter(myLetter)
    scoreMatch = calcMatch(hisLetter + ' ' + myLetter)
    score += (scoreLetter + scoreMatch)
})

console.log(score)