const { DIRECTIONS, CLOCKWISE_DIRECTIONS, ORIENTATIONS, MOVES } = require('./constants')

/**
 * @param {string} instruction One of the ORIENTATIONS.* value or default to forward
 * @param {{x: number, y: string, direction: string}} position
 * @param {{x: number, y: string}} coordinateLimits
 * @param {{x: number, y: string, direction: string}} The new position
 */
function move (instruction, position) {
  if (MOVES.FORWARD === instruction) {
    return forward(position)
  }

  return rotateFromPosition(position, instruction)
}

/**
 * @param {string} currentDirection One of the DIRECTIONS.* value
 * @param {string} orientation One of the ORIENTATIONS.* value
 * @returns {string} One of the DIRECTIONS.* value
 */
function forward (position) {
  const { x, y, direction } = position

  switch (direction) {
    case DIRECTIONS.NORTH:
      return Object.assign({}, position, {y: y + 1})
    case DIRECTIONS.EAST:
      return Object.assign({}, position, {x: x + 1})
    case DIRECTIONS.SOUTH:
      return Object.assign({}, position, {y: y - 1})
    case DIRECTIONS.WEST:
      return Object.assign({}, position, {x: x - 1})
  }
}

/**
 * @param {string} currentDirection One of the DIRECTIONS.* value
 * @param {string} orientation One of the ORIENTATIONS.* value
 * @returns {string} One of the DIRECTIONS.* value
 */
function rotate (currentDirection, orientation) {
  let directionIndexToAdd
  if (orientation === ORIENTATIONS.RIGHT) directionIndexToAdd = 1
  if (orientation === ORIENTATIONS.LEFT) directionIndexToAdd = CLOCKWISE_DIRECTIONS.length - 1

  const currentDirectionIndex = CLOCKWISE_DIRECTIONS.indexOf(currentDirection)
  const nextIndexDirection = (currentDirectionIndex + directionIndexToAdd) % CLOCKWISE_DIRECTIONS.length

  return CLOCKWISE_DIRECTIONS[nextIndexDirection]
}

/**
 * @param {{x: number, y: string, direction: string}} position
 * @param {string} orientation One of the ORIENTATIONS.* value
 * @returns {{x: number, y: string, direction: string}}
 */
function rotateFromPosition (position, orientation) {
  const directionResult = rotate(position.direction, orientation)

  return Object.assign({}, position, {direction: directionResult})
}

/**
 * @param {{x: number, y: string, direction: string}} position
 * @param {string[]} movesInstructions
 * @param {{x: number, y: string}} bottomLeftLimitPosition
 * @param {{x: number, y: string}} topRightLimitPosition
 * @returns {{x: number, y: string, direction: string}}
 */
function applyMoves (position, movesInstructions, bottomLeftLimitPosition, topRightLimitPosition) {
  let currentPosition = position

  for (const instruction of movesInstructions) {
    currentPosition = move(instruction, currentPosition)
    validatePosition(currentPosition, bottomLeftLimitPosition, topRightLimitPosition)
  }

  return currentPosition
}

/**
 * @param {{x: number, y: string, direction: string}} position
 * @param {{x: number, y: string}} bottomLeftLimitPosition
 * @param {{x: number, y: string}} topRightLimitPosition
 * @throws Will throw an error if the bottomLeftLimitPosition or topRightLimitPosition is exceeded
 */
function validatePosition (position, bottomLeftLimitPosition, topRightLimitPosition) {
  const {x, y} = position

  if (x < bottomLeftLimitPosition.x || y < bottomLeftLimitPosition.y) {
    throw new Error(`Invalid position x: ${x}, y: ${y} - bottomLeftLimitPosition is overreached`)
  }

  if (x > topRightLimitPosition.x || y > topRightLimitPosition.y) {
    throw new Error(`Invalid position x: ${x}, y: ${y} - topRightLimitPosition is overreached`)
  }
}

module.exports = {
  move,
  forward,
  rotate,
  rotateFromPosition,
  applyMoves
}
