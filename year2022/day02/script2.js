// aoc 2022 day 2 script 2

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
    // i loose
    map.set('A X', 'C')
    map.set('B X', 'A')
    map.set('C X', 'B')
    // draw
    map.set('A Y', 'A')
    map.set('B Y', 'B')
    map.set('C Y', 'C')
    // i win
    map.set('A Z', 'B')
    map.set('B Z', 'C')
    map.set('C Z', 'A')

    return map.get(letters)
}

function calcMatch(letters) {
    if (["A C", "B A", "C B"].indexOf(letters) >= 0) {
        return 0 // lost
    }
    if (["A B", "B C", "C A"].indexOf(letters) >= 0) {
        return 6 // won
    }
    return 3 // draw
}

let score = 0

array.forEach(function (item, index) {
    const theLetters = item.split(' ')
    const hisLetter = theLetters[0]
    const myLetter = transLetter(item)
    const newLetters = hisLetter + ' ' + myLetter

    scoreLetter = calcLetter(myLetter)
    scoreMatch = calcMatch(newLetters)
    score += (scoreLetter + scoreMatch)
})

console.log(score)