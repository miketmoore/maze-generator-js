import { ICoord, coordFactory } from './coord'
import { ICell, cellFactory, CellData, cellFromData, Walls } from './cell'
import { Direction } from './direction'
import { randInRange } from './rand'

export interface IGrid {
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined
  readonly getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined
  readonly getRandCoord: () => ICoord
  readonly getRandCell: () => ICell
  readonly carveWall: (coord: ICoord, direction: Direction) => void
}

class Grid implements IGrid {
  private rows: number
  private cols: number
  private cells: Walls[][]
  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.cells = []
    for (let row = 0; row < rows; row++) {
      this.cells[row] = []
      for (let col = 0; col < cols; col++) {
        this.cells[row][col] = cellFactory().getData()
      }
    }
  }

  public forEachRow = (cb: (row: ICell[], rowIndex: number) => void) => {
    this.cells.forEach((row, rowIndex) => {
      cb(row.map(data => cellFromData(data)), rowIndex)
    })
  }

  public getCell = (coord: ICoord) => {
    const { row, col } = coord
    const cells = this.cells
    if (row >= 0 && row < cells.length) {
      const r = cells[row]
      if (col >= 0 && col < r.length) {
        return cellFromData(r[col])
      }
    }
  }

  public getAdjacentCoord: (direction: Direction, coord: ICoord) => ICoord = (
    direction,
    coord
  ) => {
    switch (direction) {
      case 'north':
        return coordFactory(coord.row - 1, coord.col)
      case 'east':
        return coordFactory(coord.row, coord.col + 1)
      case 'south':
        return coordFactory(coord.row + 1, coord.col)
      case 'west':
        return coordFactory(coord.row, coord.col - 1)
    }
    return coordFactory(-1, -1)
  }

  public getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined = (direction, coord) => {
    const adjacentCoords = this.getAdjacentCoord(direction, coord)
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
    return cellFromData(this.cells[coord.row][coord.col])
  }

  public carveWall = (coord: ICoord, direction: Direction) => {
    const cell = this.getCell(coord)
    if (!cell) throw new Error('cell not found')
    cell.carveWall(direction)
    this.cells[coord.row][coord.col] = cell.getData()
  }
}

export const gridFactory: (rows: number, cols: number) => IGrid = (
  rows,
  cols
) => new Grid(rows, cols)
