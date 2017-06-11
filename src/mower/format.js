/**
 * @param {{x: number, y: string, direction: string}} position
 * @returns {string}
 */
function formatPositionToString (position) {
  const {x, y, direction} = position
  return `${x} ${y} ${direction}`
}

module.exports = {
  formatPositionToString
}
