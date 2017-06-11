/* eslint-env mocha */
const expect = require('chai').expect
const manager = require('../manager')

describe('mower.manager', function () {
  describe('handleInstructions', function () {
    it('should handle instructions', function () {
      const finalPosition = manager.handleInstructions('1 2 N', 'GAGAGAGAA', {x: 0, y: 0}, {x: 5, y: 5})
      expect(finalPosition).to.equal('1 3 N')
    })

    it('should handle input', function () {
      const input =
`5 5
1 2 N
GAGAGAGAA
3 3 E
AADAADADDA`
      const mowerPositions = manager.handleInput(input)
      console.log('mowerPositions', mowerPositions)
      expect(mowerPositions).to.equal(
`1 3 N
5 1 E`)
    })
  })
})
