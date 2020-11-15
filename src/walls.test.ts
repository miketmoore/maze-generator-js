import { wallsFactory } from './walls'

test('toArray', () => {
  const walls = wallsFactory()
  const arr = walls.toArray()
  expect(arr[0].getDirection()).toEqual('north')
  expect(arr[1].getDirection()).toEqual('east')
  expect(arr[2].getDirection()).toEqual('south')
  expect(arr[3].getDirection()).toEqual('west')
})
