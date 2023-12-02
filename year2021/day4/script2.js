// aoc 2021 day 4 script 2

// load datas
const fs = require('fs');
const array = fs.readFileSync('input.txt').toString().split("\n");

// get numbers
const numbers = array[0].split(',').map(value => Number(value))
array.shift()

// get boards
let c = r = -1
let board = []
let boards = []
array.forEach(row => {
   r++
   if (row === '') {
      colMax = c
      r = -1
      board = []
   } else {
      rowMax = r
      c = -1
      values = row.split(' ').filter(value => value != '')
      items = values.map(value => {
         c++;
         return {
            val: Number(value),
            row: r,
            col: c,
            marked: false
         }
      })
      board.push(items)
      boards.push(board)
   }
})

// search numbers on boards
winBoards = new Set()
numbers.forEach(number => {

   for (b = 0; b < boards.length; b++) {
      board = boards[b]
      for (r = 0; r < (rowMax + 1); r++) {
         row = board[r]
         for (c = 0; c < (colMax + 1); c++) {

            // mark item as number match
            item = board[r][c]
            if (number === item.val) {
               item.marked = true
            }

            // check if current row finished
            colsChecked = row.reduce(function (acc, elt) {
               if (elt.marked) acc++
               return acc
            }, 0)
            if (colsChecked === (colMax + 1)) {
               winBoards.add(b)

               // check if current board is the last one
               if (winBoards.size === boards.length) {
                  calculateAnswer('Ligne', board, row, number)
                  process.exit()
               }


            }
            col = []
            for (r2 = 0; r2 < (colMax + 1); r2++) {
               col.push(board[r2][c])
            }

            // check if current column finished
            rowsChecked = col.reduce(function (acc, elt) {
               if (elt.marked) acc++
               return acc
            }, 0)
            if (rowsChecked === (rowMax + 1)) {
               winBoards.add(b)

               // check if current board is the last one
               if (winBoards.size === boards.length) {
                  calculateAnswer('Colonne', board, col, number)
                  process.exit()
               }
            }

         }
      }
   }
})

function calculateAnswer(typeRowCol, board, valRowCol, number) {
   sumUnmarked = board.flat().reduce(function (acc, elt) {
      if (!elt.marked) acc += elt.val
      return acc
   }, 0)

   //console.log('%s finie !\n\nboard = %O, col = %O, number = %d', typeRowCol, board, valRowCol, number)
   console.log('Answer', sumUnmarked * number)
}