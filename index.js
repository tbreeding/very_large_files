const fs = require('fs')
const readLine = require('readline')
const Stream = require('stream')

const instream = fs.createReadStream('./indiv18/by_date/itcont_2018_invalid_dates.txt')
const outstream = new Stream()
const rl = readLine.createInterface(instream, outstream)


const names = []
const dateDonationCount = []
const dateDonations = {}

const firstNames = []
const dupNames = {}

const getFullName = name => {
    return name.reduce((acc, next, i) => {
        if(!i) return acc += `${next}, `
        return acc += `${next} `
    }, '').trim()
}

const sortNames = (a, b) => b[1] = a[1]

rl.on('line', line => {
    const name = line.split('|')[7].replace(',', '').split(' ')
    names.push(name)
    if(name.length > 1) firstNames.push(name[1])
    if(name.length === 1) firstNames.push(name[0])

    const timeStamp = line.split('|')[4].slice(0, 6)
    const formattedTimeStamp = `${timeStamp.slice(0, 4)}-${timeStamp.slice(4, 6)}`
    dateDonationCount.push(formattedTimeStamp)
})

rl.on('close', () => {
    console.log('line count:', names.length)

    console.log('name 432:', getFullName(names[432]))
    // console.log('name 43243', getFullName(names[43243]))

    firstNames.forEach(n => {
        console.log(n)
        dupNames[n] = (dupNames[n] || 0) + 1
    })
    const sortedNames = Object.entries(dupNames).sort(sortNames)

    console.log('Most common first name:', sortedNames[0])

})

