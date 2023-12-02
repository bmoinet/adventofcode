// aoc 2021 day 2 script 2

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

const total = array.reduce(function (acc, item) {

  const match = item.match(/(\w+) (\d+)/)
  const [action, value] = [match[1], Number(match[2])]

  switch (action) {
    case 'up':
      acc.aim -= value
      break
    case 'down':
      acc.aim += value
      break
    default:
      acc.horiz += value
      acc.depth += acc.aim * value
  }

  return acc
}, {'depth': 0, 'horiz': 0, 'aim': 0})

const answer = total.depth * total.horiz
console.log('Answer', answer)