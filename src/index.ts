import { gridFactory, IGrid } from './grid'
import { carveMaze } from './carve-maze'

export { IGrid } from './grid'
export { ICell } from './cell'

interface Params {
  readonly rows: number
  readonly columns: number
}

const isObject = (obj: any) => {
  var type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

export const mazeGenerator: (params: Params) => IGrid = (params: Params) => {
  if (Array.isArray(params) || !isObject(params)) {
    throw new Error('params must be an object')
  }
  const { rows, columns } = params
  if (typeof rows !== 'number') {
    throw new Error('rows is required')
  }
  if (rows < 0) {
    throw new Error('rows must be a positive integer')
  }
  if (typeof columns !== 'number') {
    throw new Error('columns is required')
  }
  if (columns < 0) {
    throw new Error('columns must be a positive integer')
  }
  const grid = gridFactory(rows, columns)
  carveMaze(grid)
  return grid
}
