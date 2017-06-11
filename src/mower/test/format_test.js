/* eslint-env mocha */
const expect = require('chai').expect
const format = require('../format')

describe('mower.format', function () {
  describe('formatPositionToString', function () {
    it('should format position to a string', function () {
      const formatted = format.formatPositionToString({x: 2, y: 3, direction: 'N'})
      expect(formatted).to.equal('2 3 N')
    })
  })
})
