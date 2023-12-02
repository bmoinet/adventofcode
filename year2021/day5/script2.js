// aoc 2021 day 5 script 2

// load datas
const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");
const size = 1000

// check if hz/vr lines
const regexHzVr = /^(\d+),(\d+) -> (\1),(\d+)$|^(\d+),(\d+) -> (\d+),(\6)$/

// check for random lines
const regexRand = /^(\d+),(\d+) -> (\d+),(\d+)$/

// check if diagonal line
function diag(x1, y1, x2, y2) {
   return Math.abs(x1 - x2) === Math.abs(y1 - y2)
}

// create empty matrix
let matrix = new Array(size).fill(0).map(() => new Array(size).fill(0))

// loop into datas
array.map(function (entry, index) {

   const matchHzVr = entry.match(regexHzVr)
   const matchRand = entry.match(regexRand)

   if (matchHzVr !== null) { // hz or vr lines

      if (typeof matchHzVr[1] === 'undefined') { // y1 = y2
         let [x1, y1, x2] = [Number(matchHzVr[5]), Number(matchHzVr[6]), Number(matchHzVr[7])]
         if (x1 > x2) [x1, x2] = [x2, x1]

         for (let x = x1; x < (x2 + 1); x++) {
            matrix[x][y1]++
            //console.log('Match y1=y2 (ligne %d) : x,y : v ==> %d,%d : %d', index, x, y1, matrix[x][y1])
         }
      } else { // x1 = x2
         let [x1, y1, y2] = [Number(matchHzVr[1]), Number(matchHzVr[2]), Number(matchHzVr[4])]
         if (y1 > y2) [y1, y2] = [y2, y1]

         for (let y = y1; y < (y2 + 1); y++) {
            matrix[x1][y]++
            //console.log('Match x1=x2 (ligne %d) : x,y : v ==> %d,%d : %d', index, x1, y, matrix[x1][y])
         }
      }

   } else if (matchRand !== null) { // random line

      let [x1, y1, x2, y2] = [Number(matchRand[1]), Number(matchRand[2]), Number(matchRand[3]), Number(matchRand[4])]

      if (x1 > x2) {
         let xt = x2, yt = y2
         x2 = x1, y2 = y1
         x1 = xt, y1 = yt
      }

      if (diag(x1, y1, x2, y2)) { // diag line ?
         for (let x = x1, y = y1; x < (x2 + 1); x++) {
            matrix[x][y]++
            //console.log('Match diag (ligne %d) : x,y : v ==> %d,%d : %d', index, x, y, matrix[x][y])
            y += (y1 > y2) ? -1 : 1
         }
      }
   }

   return
})

let display = ''
for (l = 0; l < size; l++) {
   for (c = 0; c < size; c++) {
      display += (matrix[c][l] === 0 ? '.' : matrix[c][l])
   }
   display += '\n'
}
//console.log('\nMatrix :\n\n%O\n', matrix)
//console.log('\nDisplay :\n\n%s\n', display)

// search overlaps in matrix
overlaps = matrix.flat().reduce(function (acc, value) {
   if (value > 1) acc++
   return acc
}, 0)

console.log('Answer', overlaps)