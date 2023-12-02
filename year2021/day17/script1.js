// aoc 2021 day 17 script 1

const fs = require('fs')
const array = fs.readFileSync('input.txt').toString().split("target area: ")[1].split(', ')
//console.log('Array', array)

const xTarget = array[0].split('x=')[1].split('..')
const yTarget = array[1].split('y=')[1].split('..')

const xMin = Number(xTarget[0]), xMax = Number(xTarget[1])
const yMin = Number(yTarget[0]), yMax = Number(yTarget[1])

const buildRange = function (start, end) {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
}

const target = {
    x: buildRange(xMin, xMax),
    y: buildRange(yMin, yMax)
}
//console.log('Target', target)

let highBest = null
let velocity, velocityBest = null
let probe, probeNew = null

const veloMax = 1000
const stepMax = 500

for (let vx = -veloMax; vx < veloMax; vx++) {
    for (let vy = -veloMax; vy < veloMax; vy++) {

        velocity = { x: vx, y: vy }
        probe, probeNew = { x: 0, y: 0 }

        let high = null
        let step = 0
        let probes = []

        while (true) {

            probe = probeNew

            probe.x += velocity.x
            probe.y += velocity.y

            high = Math.max(high, probe.y)

            probeNew = { x: probe.x, y: probe.y }
            probes.push(probeNew)

            velocity.x = (velocity.x > 0) ? velocity.x - 1 : (velocity.x < 0 ? velocity.x + 1 : velocity.x)
            velocity.y--

            //console.log('Step %d : %O', step, probe)
            //console.log('\Target : %O', target)

            if (target.x.includes(probe.x) && target.y.includes(probe.y)) {
                console.log('\nTarget at step %d :-)', step)
                console.log('High is here %d', high)

                if (high > highBest) {
                    highBest = high
                    velocityBest = velocity

                    drawArea(probes, target)
                    console.log('New high %d with velocity %O', highBest, velocityBest)
                }
                break
            }

            if (step === stepMax) {
                //drawArea(probes, target)
                //console.log('\nMissed after %d steps :-(', step)
                break
            }

            step++
        }

    }
}

console.log('\nNew highBest %d with velocity %O', highBest, velocityBest)


function containsObject(point, array) {
    return array.some(elem => elem.x === point.x && elem.y === point.y)
}

function drawSymbol(point, probes, target) {
    switch (true) {
        case (point.x === 0 && point.y === 0): return '#'
        case (containsObject(point, probes)): return '#'
        case (target.x.includes(point.x) && target.y.includes(point.y)): return 'T'
        case (point.x === 0): return '|'
        case (point.y === 0): return '-'
        default: return '.'
    }
}

function drawArea(probes, target) {
    //console.log('Probes', probes)
    // process.exit()

    const percent = {
        x: 10,
        y: 80
    }

    const delta = {
        x: Math.abs(Math.ceil((Math.max(...target.x) - Math.min(...target.x) * (100 + percent.x) / 100))),
        y: Math.abs(Math.ceil((Math.max(...target.y) - Math.min(...target.y) * (100 + percent.y) / 100)))
    }
    //console.log('Delta %O', delta)

    const area = {
        x: buildRange(-2, (Math.max(...target.x) + delta.x)),
        y: buildRange((Math.min(...target.y) - delta.y), (Math.max(...target.y) + delta.y)).reverse()
    }
    //console.log('Area', area)
    //process.exit()

    let drawing = ''
    for (y of area.y) {
        drawing += "\n"
        for (x of area.x) {
            drawing += drawSymbol({ x, y }, probes, target)
        }
    }
    //console.log('Drawing (%d..%d;%d..%d)', Math.min(...area.x), Math.max(...area.x), Math.min(...area.y), Math.max(...area.y))
    console.log(drawing)
}

console.log('Answer', highBest)