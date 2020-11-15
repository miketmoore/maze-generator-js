import { wallFactory } from './wall'

test('carve', () => {
  const wall = wallFactory('north')
  expect(wall.isSolid()).toEqual(true)
  expect(wall.isCarved()).toEqual(false)
  wall.carve()
  expect(wall.isSolid()).toEqual(false)
  expect(wall.isCarved()).toEqual(true)
})
