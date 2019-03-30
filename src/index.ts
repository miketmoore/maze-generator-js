import { gridFactory } from './grid'
import { carveMaze } from './carve-maze'

class MazeGen {
  private rows: number
  private cols: number
  constructor(rows: number, cols: number) {
    if (typeof rows !== 'number') {
      throw new Error('rows is required')
    }
    if (typeof cols !== 'number') {
      throw new Error('cols is required')
    }
    this.rows = rows
    this.cols = cols
  }
  public generate = () => {
    const grid = gridFactory(this.rows, this.cols)
    carveMaze(grid)
    return grid
  }
}

export const mazeGenerator = (rows: number, cols: number) => {
  const mazeGen = new MazeGen(rows, cols)
  return mazeGen.generate()
}
