// aoc 2021 day 8 script 2

const fs = require('fs');
let array = fs.readFileSync('example.txt').toString().split("\n")
array = array.map(item => item.split(' | ')[1])
//console.log('Array', array)

const uniqueDigits = [
    { value: '1', digits: 'ab' },
    { value: '2', digits: 'acdfg' },
    { value: '3', digits: 'abcdf' },
    { value: '4', digits: 'abef' },
    { value: '5', digits: 'bcdef' },
    { value: '6', digits: 'bcdefg' },
    { value: '7', digits: 'abd' },
    { value: '8', digits: 'abcdefg' },
    { value: '9', digits: 'abcdef' }
]

function sortString(str) {
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

let array2 = []
array.forEach(line => {
    let line2 = line.split(' ')
    line2 = line2.map(elt => sortString(elt))
    console.log(line2)
    
    let obj2 = line2.map(function(str) {
        let obj = uniqueDigits.find(elt => elt.digits === str)
        str = (obj !== undefined) ? obj.value : '?'
        //console.log(obj, str)
        //process.exit()
        return str
    })
    array2.push(obj2.join(''))

    console.log('Line', line2, obj2)
})
console.log(array2)
