const os = require('os')
const parse = require('./parse')
const format = require('./format')
const moves = require('./moves')

const { formatPositionToString } = format
const {
  parseStringPosition,
  parseStringMoves
} = parse

/**
 * @param {*} rawPosition
 * @param {*} rawMoves
 * @param {{x: number, y: string, direction: string}} bottomLeftLimitPosition
 * @param {{x: number, y: string, direction: string}} topRightLimitPosition
 * @param {object} options
 */
function handleInstructions (
  rawPosition,
  rawMoves,
  bottomLeftLimitPosition,
  topRightLimitPosition,
  options = {
    parsePosition: parseStringPosition,
    parseMoves: parseStringMoves,
    formatPosition: formatPositionToString
  }
) {
  const position = options.parsePosition(rawPosition)
  const movesInstructions = options.parseMoves(rawMoves)

  const finalPosition = moves.applyMoves(position, movesInstructions, bottomLeftLimitPosition, topRightLimitPosition)

  return options.formatPosition(finalPosition)
}

/**
 * @param input
 * @param bottomLeftLimitPosition
 * @returns {Array}
 */
function handleInput (
  input,
  bottomLeftLimitPosition = {x: 0, y: 0},
  options = {
    parsePosition: parseStringPosition
  }
) {
  const arrayInput = input.split(os.EOL)
  const rawTopRightLimitPosition = arrayInput.shift()
  const topRightLimitPosition = options.parsePosition(rawTopRightLimitPosition)

  const mowersPositions = []
  for (let i = 0; i < arrayInput.length - 1; i += 2) {
    const rawPosition = arrayInput[i]
    const rawMoves = arrayInput[i + 1]

    const finalPosition = handleInstructions(
      rawPosition, rawMoves, bottomLeftLimitPosition, topRightLimitPosition
    )

    mowersPositions.push(finalPosition)
  }

  return mowersPositions.join(os.EOL)
}

module.exports = {
  handleInstructions,
  handleInput
}
