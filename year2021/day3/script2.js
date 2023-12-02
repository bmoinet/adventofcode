// aoc 2021 day 3 script 2

const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");
const size = array[0].length

function calculate(array, way) {

  let binaries = array

  for (let s=0; s<size; s++) {

    let criteria = binaries.reduce(function (acc, item) {

      const key = Number(item[s]) === 1 ? 'ones' : 'zeros'
      acc[key]++

      if (way === 'most') {
        acc.winner = acc.ones >= acc.zeros ? 1 : 0
      } else { // 'least'
        acc.winner = acc.zeros > acc.ones ? 1 : 0
      }

      return acc
    }, {'zeros': 0, 'ones': 0, 'way': way, 'winner': null})

    binaries = binaries.filter(item => Number(item.charAt(s)) === criteria.winner)
    //console.log('Binaries step %d : %O (%d)', s, binaries, binaries.length)

    if (binaries.length === 1)
      break
  }

  const binariesDec = parseInt(binaries.join(''), 2)
  //console.log('Answer %s : %O => %d', way, binaries, binariesDec)

  return binariesDec
}

const generator = calculate(array, 'most')
const scrubber = calculate(array, 'least')

console.log('Generator, Scrubber, Answer', generator, scrubber, generator * scrubber)