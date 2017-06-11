/**
 * @param {array} arrayCoordinates
 * @returns {{x: number, y: string}}
 */
function parseArrayCoordinates (arrayCoordinates) {
  const coordinates = arrayCoordinates
    .map(coordinate => parseInt(coordinate))
  const [x, y] = coordinates

  return {x, y}
}

/**
 * @param {string} stringCoordinates
 * @returns {{x: number, y: string}}
 */
function parseStringCoordinates (stringCoordinates) {
  const arrayCoordinates = stringCoordinates.split(' ')

  return parseArrayCoordinates(arrayCoordinates)
}

/**
 * @param {array} arrayCoordinates
 * @returns {{x: number, y: string, direction: string}}
 */
function parseArrayPosition (arrayPosition) {
  const direction = arrayPosition.pop()
  const {x, y} = parseArrayCoordinates(arrayPosition)

  return {x, y, direction}
}

/**
 * @param {string} stringPosition
 * @returns {{x: number, y: string, direction: string}}
 */
function parseStringPosition (stringPosition) {
  const arrayPosition = stringPosition.split(' ')

  return parseArrayPosition(arrayPosition)
}

/**
 * @param {string} stringMoves
 * @returns {array}
 */
function parseStringMoves (stringMoves) {
  return stringMoves.split('')
}

module.exports = {
  parseArrayCoordinates,
  parseStringCoordinates,
  parseArrayPosition,
  parseStringPosition,
  parseStringMoves
}
