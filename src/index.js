const fs = require('fs')
const path = require('path')
const os = require('os')
const mower = require('./mower')

const file = path.join(__dirname, './instructions')

console.log(`Starting reading mower instruction file: ${file} ${os.EOL}`)

const fileContent = fs.readFileSync(file, 'utf8')
console.log(`Instructions: ${os.EOL}`, fileContent)

const output = mower.manager.handleInput(fileContent)

console.log(`Result: ${os.EOL}`, output)
