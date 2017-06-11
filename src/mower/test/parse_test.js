/* eslint-env mocha */
const expect = require('chai').expect
const parse = require('../parse')

describe('mower.parse', function () {
  describe('parseArrayCoordinates', function () {
    it('should parse coordinates defined by an array', function () {
      const parsed = parse.parseArrayCoordinates([3, 3])
      expect(parsed).to.deep.equal({x: 3, y: 3})
    })
  })

  describe('parseStringCoordinates', function () {
    it('should parse coordinates from a string input', function () {
      const parsed = parse.parseStringCoordinates('3 3')
      expect(parsed).to.deep.equal({x: 3, y: 3})
    })
  })

  describe('parseArrayPosition', function () {
    it('should parse a position defined by an array', function () {
      const parsed = parse.parseArrayPosition([1, 2, 'N'])
      expect(parsed).to.deep.equal({x: 1, y: 2, direction: 'N'})
    })
  })

  describe('parseStringPosition', function () {
    it('should parse position from a raw input', function () {
      const parsed = parse.parseStringPosition('1 2 N')
      expect(parsed).to.deep.equal({x: 1, y: 2, direction: 'N'})
    })
  })
})
