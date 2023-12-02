// aoc 2021 day 16 script 1

const fs = require('fs')
const elementStr = fs.readFileSync('example0.txt').toString()

const anyBase = require('any-base')
hex2bin = anyBase(anyBase.HEX, anyBase.BIN)
bin2hex = anyBase(anyBase.BIN, anyBase.HEX)
bin2dec = anyBase(anyBase.BIN, anyBase.DEC)

const elementHex = elementStr.toLowerCase()
console.log('Element hex', elementHex.toUpperCase())
elementBin = hex2bin(elementHex)
console.log('Element bin1', elementBin)

elementBin = elementBin.padStart(elementStr.length * 4, '0')
console.log('Element bin', elementBin)

versionBin = elementBin.substring(0, 3)
console.log('Version bin', versionBin)
versionDec = bin2dec(versionBin)
console.log('Version dec', versionDec)

typeidBin = elementBin.substring(3, 6)
console.log('TypeId bin', typeidBin)
typeidDec = bin2dec(typeidBin)
console.log('TypeId dec', typeidDec)


//console.log('Answer', highBest)