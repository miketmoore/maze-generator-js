import { cellFactory } from './cell'

describe('getOppositeWall', () => {
  const data = [[0, 2], [1, 3], [2, 0], [3, 1]]
  data.forEach(([input, output]) => {
    it(`${input} => ${output}`, () => {
      const cell = cellFactory()
      expect(cell.getOppositeWall(input)).toEqual(output)
    })
  })
})

describe('isCarved', () => {
  it('false when no walls are carved', () => {
    const cell = cellFactory()
    expect(cell.isCarved()).toEqual(false)
  })
  it('true when one wall is carved', () => {
    const cell = cellFactory()
    cell.getWalls().north.state = 'carved'
    expect(cell.isCarved()).toEqual(true)
  })
})
