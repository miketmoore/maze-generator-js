import { ICoord, coordFactory } from './coord'
import { ICell, Cell, Direction } from './cell'
import { randInRange } from './rand'

export interface IGrid {
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined
  readonly getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined
  readonly getRandCoord: () => ICoord
  readonly getRandCell: () => ICell
  readonly getAvailableCellWalls: (
    cell: ICell,
    cellCoord: ICoord
  ) => Direction[]
  readonly carveCellWall: (coord: ICoord, direction: Direction) => void
}

class Grid implements IGrid {
  private rows: number
  private cols: number
  private cells: string[][]
  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.cells = []
    for (let row = 0; row < rows; row++) {
      this.cells[row] = []
      for (let col = 0; col < cols; col++) {
        this.cells[row][col] = Cell.new().getData()
      }
    }
  }

  public forEachRow = (cb: (row: ICell[], rowIndex: number) => void) => {
    this.cells.forEach((row, rowIndex) => {
      cb(row.map(Cell.newFromData), rowIndex)
    })
  }

  public getCell = (coord: ICoord) => {
    const { row, col } = coord
    const cells = this.cells
    if (row >= 0 && row < cells.length) {
      const r = cells[row]
      if (col >= 0 && col < r.length) {
        return Cell.newFromData(r[col])
      }
    }
  }

  public getAdjacentCoord = (direction: Direction, { row, col }: ICoord) => {
    switch (direction) {
      case 'north':
        if (row === 0) return undefined
        return coordFactory(row - 1, col)
      case 'east':
        if (col === this.cols - 1) return undefined
        return coordFactory(row, col + 1)
      case 'south':
        if (row === this.rows - 1) return undefined
        return coordFactory(row + 1, col)
      case 'west':
        if (col === 0) return undefined
        return coordFactory(row, col - 1)
    }
  }

  public getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined = (direction, coord) => {
    const adjacentCoords = this.getAdjacentCoord(direction, coord)
    if (!adjacentCoords) return undefined
    return this.coordInBounds(adjacentCoords)
      ? this.getCell(adjacentCoords)
      : undefined
  }

  private rowInBounds = (row: number) => row >= 0 && row < this.rows
  private colInBounds = (col: number) => col >= 0 && col < this.cols
  private coordInBounds = (coord: ICoord) => {
    return this.rowInBounds(coord.row) && this.colInBounds(coord.col)
  }

  public getRandCoord = () =>
    coordFactory(randInRange(0, this.rows - 1), randInRange(0, this.cols - 1))

  public getRandCell = () => {
    const coord = this.getRandCoord()
    return Cell.newFromData(this.cells[coord.row][coord.col])
  }

  private isWallAvailable = (
    coord: ICoord,
    direction: Direction,
    cell: ICell
  ) => {
    if (cell.isWallSolid(direction)) {
      const adjacentCell = this.getAdjacentCell(direction, coord)
      return adjacentCell && !adjacentCell.isVisited()
    }
    return false
  }

  public getAvailableCellWalls = (cell: ICell, cellCoord: ICoord) => {
    // available cell walls are walls that have not been carved and that are adjacent to a cell
    // that has not been visited

    const results: Direction[] = []
    if (this.isWallAvailable(cellCoord, 'north', cell)) results.push('north')
    if (this.isWallAvailable(cellCoord, 'east', cell)) results.push('east')
    if (this.isWallAvailable(cellCoord, 'south', cell)) results.push('south')
    if (this.isWallAvailable(cellCoord, 'west', cell)) results.push('west')
    return results
  }

  private updateCell = ({ row, col }: ICoord, cell: ICell) => {
    this.cells[row][col] = cell.getData()
  }

  public carveCellWall = (coord: ICoord, direction: Direction) => {
    const cell = this.getCell(coord)
    if (!cell) {
      throw new Error('cell not found')
    }
    cell.carveWall(direction)
    this.updateCell(coord, cell)
  }
}

export const gridFactory: (rows: number, cols: number) => IGrid = (
  rows,
  cols
) => new Grid(rows, cols)
