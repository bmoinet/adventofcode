// aoc 2021 day 12 script 1

const fs = require('fs')
let array = fs.readFileSync('example.txt').toString().split("\n")
//console.log('Array', array)

let segments = array.map(elt => {
    elt = elt.split('-')
    return {
        keyFirst: elt[0],
        keyLast: elt[1],
    }
})


let caves = []
array.map(elt => {
    elt = elt.split('-')

    const idxs = [0, 1]
    idxs.forEach(idx => {
        let key = null
        if (caves.filter(e => e.keyName === elt[idx]).length === 0) {
            key = elt[idx]
        }


        if (key != null) {
            let connectedTo = []
            segments.filter(function (seg) {
                if (seg.keyFirst === key) { connectedTo.push(seg.keyLast) }
                if (seg.keyLast === key) { connectedTo.push(seg.keyFirst) }
            })

            const cave = {
                keyName: key,
                isVisited: false,
                isSmall: (key.length === 1 && key.toLowerCase() === key),
                connectedTo: connectedTo
            }

            caves.push(cave)
        }
    })
})

//console.log('segments (%d) : %O', segments.length, segments)
//console.log('caves (%d) : %O', caves.length, caves)

let paths = []

let path = []

const elt = caves.find(elt => elt.keyName === 'start')

elt.isVisited = true
path.push(elt.keyName)

console.log('Visited :) ', elt.keyName)
console.log('Path :) ', path.join(','))
console.log('\n')

visitAdjacentCaves(elt)

function visitAdjacentCaves(elt) {

    while (elt.connectedTo.length > 0) {

        console.log("Connected to '%s' : %O", elt.keyName, elt.connectedTo)
        let key = elt.connectedTo.pop()
        console.log("Pop", key)
        let cave = caves.find(e => e.keyName === key)

        if (elt.keyName === 'end') {
            elt.isVisited = true
            path.push(elt.keyName)
            console.log("End path")
            paths.push(path)
            return
        }

        if (elt.keyName === 'start') {
            console.log("Return (start)")
            continue
        }

        if ((true === cave.isSmall && false === cave.isVisited)) {
            cave.isVisited = true
            path.push(cave.keyName)

            console.log('Visited :', cave.keyName)
            console.log('Path :', path.join(','))
            //console.log('Elt : ', cave)
            console.log('\n')

            visitAdjacentCaves(cave)
        }

    }

}

console.log('\nPaths', paths)
process.exit()

let answer = null
console.log('Answer', answer)