import { gridFactory } from './grid'
import { carveMaze } from './carve-maze'

interface Options {
  readonly rows: number
  readonly cols: number
}

class MazeGen {
  private rows: number
  private cols: number
  constructor(options: Options) {
    if (!options.rows) {
      throw new Error('rows is required')
    }
    if (!options.cols) {
      throw new Error('cols is required')
    }
    this.rows = options.rows
    this.cols = options.cols
  }
  public generate = () => carveMaze(gridFactory(this.rows, this.cols))
}

export const mazeGenerator = (options: Options) => {
  const mazeGen = new MazeGen(options)
  return mazeGen.generate()
}
