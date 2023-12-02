// aoc 2021 day 10 script 2

const fs = require('fs')
let array = fs.readFileSync('input.txt').toString().split("\n")
//console.log('Array', array)

const scoreParanthesis = [
    { char: ")", value: 1 },
    { char: "]", value: 2 },
    { char: "}", value: 3 },
    { char: ">", value: 4 }
]

function checkParanthesis(str) {
    const pairings = {
        ")": "(",
        "]": "[",
        "}": "{",
        ">": "<"
    }

    let stack = []

    for (let i = 0; i < str.length; i++) {
        let chr = str[i]
        if (chr == "(" || chr == "[" || chr == "{" || chr == "<") {
            stack.push(chr)
        } else if (chr in pairings) {
            if (stack.pop() != pairings[chr]) {
                return { pos: i, char: chr }
            }
        }
    }
}


array = array.filter(str => checkParanthesis(str) === undefined)
//console.log('Filter', array)


function checkParanthesisReverse(str) {
    const pairings = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    }

    let stack = []
    let missing = []

    for (let i = str.length - 1; i >= 0; i--) {
        let chr = str[i]

        if (chr == ")" || chr == "]" || chr == "}" || chr == ">") {
            stack.push(chr)
        } else if (chr == "(" || chr == "[" || chr == "{" || chr == "<") {
            if (stack.length > 0) {
                stack.pop()
            } else {
                chrRev = pairings[chr]
                missing.push(chrRev)
            }
        }

    }

    return missing
}

function calcParanthesisScore(arr) {
    const pairings = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }
    const score = arr.reduce(function (acc, elt) {

        acc = acc * 5
        const incr = acc + pairings[elt]

        return incr
    }, 0)

    return score
}

const calcMedian = arr => {
    const mid = Math.floor(arr.length / 2)
    const nums = [...arr].sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

array = array.map(str => checkParanthesisReverse(str))

array = array.map(arr => calcParanthesisScore(arr))

let answer = calcMedian(array.sort())

console.log('Answer', answer)
