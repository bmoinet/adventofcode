// aoc 2021 day 10 script 1

const fs = require('fs')
let array = fs.readFileSync('input.txt').toString().split("\n")
//console.log('Array', array)

const scoreParanthesis = [
    { char: ")", value: 3 },
    { char: "]", value: 57 },
    { char: "}", value: 1197 },
    { char: ">", value: 25137 }
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
        if (str[i] == "(" || str[i] == "[" || str[i] == "{" || str[i] == "<") {
            stack.push(str[i])
        } else if (str[i] in pairings) {
            if (stack.pop() != pairings[str[i]]) {
                return { pos: i, char: str[i] }
            }
        }
    }

    return {}
}

const answer = array.reduce(function (acc, elt) {
    chk = checkParanthesis(elt)

    let obj = scoreParanthesis.find(scr => scr.char === chk.char)
    let incr = (obj !== undefined) ? obj.value : 0
    //console.log("obj, incr", obj, incr)

    return acc + incr
}, 0)

console.log('Answer', answer)
