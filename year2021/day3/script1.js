// aoc 2021 day 3 script 1

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");
const size = array[0].length

function calculate(array, way) {

  let binaries = []

  for (let s=0; s<size; s++) {

    let result = array.reduce(function (acc, item) {

      const key = Number(item[s]) === 1 ? 'ones' : 'zeros'
      acc[key]++

      if (way === 'most') {
        acc.winner = acc.ones > acc.zeros ? 1 : 0
      } else { // 'least'
        acc.winner = acc.ones > acc.zeros ? 0 : 1
      }

      return acc
    }, {'zeros': 0, 'ones': 0, 'way': way, 'winner': null})

    binaries[s] = result.winner
    //console.log('binaries [%d] in way %s : %O', s, way, result)

  }

  const binariesDec = parseInt(binaries.join(''), 2)
  //console.log('Answer : ', binaries, binariesDec)

  return binariesDec
}

const gamma = calculate(array, 'most')
const epsilon = calculate(array, 'least')
console.log('Gamma, Epsilon, Answer', gamma, epsilon, gamma * epsilon)
