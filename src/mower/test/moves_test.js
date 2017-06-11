/* eslint-env mocha */
const expect = require('chai').expect
const moves = require('../moves')

describe('mower.moves', function () {
  describe('rotate', function () {
    const testData = [
      {direction: 'N', orientation: 'D', expected: 'E'},
      {direction: 'N', orientation: 'G', expected: 'W'},
      {direction: 'E', orientation: 'D', expected: 'S'},
      {direction: 'E', orientation: 'G', expected: 'N'},
      {direction: 'S', orientation: 'D', expected: 'W'},
      {direction: 'S', orientation: 'G', expected: 'E'},
      {direction: 'W', orientation: 'D', expected: 'N'},
      {direction: 'W', orientation: 'G', expected: 'S'}
    ]

    testData.forEach((data) => {
      const {direction, orientation, expected} = data
      const directionResult = moves.rotate(direction, orientation)

      describe(`rotate with direction "${direction}", orientation "${orientation}"`, function () {
        it(`should rotate to the direction: ${expected}`, function () {
          expect(directionResult).to.equal(expected)
        })
      })
    })
  })

  describe('rotateFromPosition', function () {
    it('should rotate for a given position and orientation', function () {
      const result = moves.rotateFromPosition({x: 1, y: 2, direction: 'N'}, 'G')
      expect(result).to.deep.equal({x: 1, y: 2, direction: 'W'})
    })
  })

  describe('forward', function () {
    const testData = [
      {position: {x: 1, y: 1, direction: 'N'}, expected: {x: 1, y: 2, direction: 'N'}},
      {position: {x: 1, y: 1, direction: 'E'}, expected: {x: 2, y: 1, direction: 'E'}},
      {position: {x: 1, y: 1, direction: 'S'}, expected: {x: 1, y: 0, direction: 'S'}},
      {position: {x: 1, y: 1, direction: 'W'}, expected: {x: 0, y: 1, direction: 'W'}}
    ]

    const limitCoordinates = {x: 5, y: 5}

    testData.forEach((data) => {
      const {position, expected} = data
      const {x, y, direction} = position
      const positionResult = moves.forward(position, limitCoordinates)

      describe(`forward with x:"${x}", y:"${y}", direction:"${direction}"`, function () {
        it(`should forward with expected x:"${expected.x}", y:"${expected.y}", direction:"${expected.direction}`, function () {
          expect(positionResult).to.deep.equal(expected)
        })
      })
    })
  })

  describe('move', function () {
    it('should move forward if the given instruction is forward', function () {
      const result = moves.move('A', {x: 1, y: 2, direction: 'N'})
      expect(result).to.deep.equal({x: 1, y: 3, direction: 'N'})
    })

    it('should rotate if the given instruction is a rotation', function () {
      const result = moves.move('G', {x: 1, y: 2, direction: 'N'})
      expect(result).to.deep.equal({x: 1, y: 2, direction: 'W'})
    })
  })

  describe('applyMoves', function () {
    it('should applyMoves', function () {
      const initialPosition = {x: 1, y: 2, direction: 'N'}
      const instructions = ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A']
      const bottomLeftLimitPosition = {x: 0, y: 0}
      const topRightLimitPosition = {x: 10, y: 10}

      const finalPosition = moves.applyMoves(
        initialPosition, instructions, bottomLeftLimitPosition, topRightLimitPosition
      )

      expect(finalPosition).to.deep.equal({x: 1, y: 3, direction: 'N'})
    })

    it('should throw an error if the bottomLeftLimitPosition is crossed', function () {
      const initialPosition = {x: 1, y: 2, direction: 'S'}
      const instructions = ['A', 'A', 'A', 'A']
      const bottomLeftLimitPosition = {x: 0, y: 0}
      const topRightLimitPosition = {x: 10, y: 10}

      expect(() => moves.applyMoves(
        initialPosition, instructions, bottomLeftLimitPosition, topRightLimitPosition
      )).to.throw(/bottomLeftLimitPosition is overreached/)
    })

    it('should throw an error if the topRightLimitPosition is crossed', function () {
      const initialPosition = {x: 1, y: 2, direction: 'N'}
      const instructions = ['A', 'A', 'A', 'A']
      const bottomLeftLimitPosition = {x: 0, y: 0}
      const topRightLimitPosition = {x: 4, y: 4}

      expect(() => moves.applyMoves(
        initialPosition, instructions, bottomLeftLimitPosition, topRightLimitPosition
      )).to.throw(/topRightLimitPosition is overreached/)
    })
  })
})
