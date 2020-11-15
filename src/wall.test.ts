import { wallFactory } from './wall'

test('carve', () => {
  const wall = wallFactory('north')
  expect(wall.isSolid()).toEqual(true)
  wall.carve()
  expect(wall.isSolid()).toEqual(false)
})
