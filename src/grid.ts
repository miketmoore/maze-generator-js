import { ICoord, coordFactory } from './coord'
import { ICell, cellFactory } from './cell'
import { Direction } from './direction'
import { randInRange } from './rand'
import { Wall } from './walls'

export interface IGrid {
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined
  readonly getRandCoord: () => ICoord
  readonly getRandCell: () => ICell
  readonly getAvailableCellWalls: (cell: ICell, cellCoord: ICoord) => Wall[]
}

class Grid implements IGrid {
  private rows: number
  private cols: number
  private cells: ICell[][]
  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.cells = []
    for (let row = 0; row < rows; row++) {
      this.cells[row] = []
      for (let col = 0; col < cols; col++) {
        this.cells[row][col] = cellFactory(coordFactory(row, col))
      }
    }
  }

  public getCell = (coord: ICoord) => {
    const { row, col } = coord
    const cells = this.cells
    if (row >= 0 && row < cells.length) {
      const r = cells[row]
      if (col >= 0 && col < r.length) {
        return r[col]
      }
    }
  }

  private getAdjacentCellCoords: (
    direction: Direction,
    coord: ICoord
  ) => ICoord = (direction, coord) => {
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
    const adjacentCoords = this.getAdjacentCellCoords(direction, coord)
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
    return this.cells[coord.row][coord.col]
  }

  public getAvailableCellWalls = (cell: ICell, cellCoord: ICoord) => {
    // available cell walls are walls that have not been carved and that are adjacent to a cell
    // that has not been visited

    const walls = cell.getWalls()
    const results: Wall[] = []
    walls.forEach((direction, wall) => {
      if (wall.state === 'solid') {
        const adjacentCell = this.getAdjacentCell(direction, cellCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          results.push(wall)
        }
      }
    })

    return results
  }
}

export const gridFactory: (rows: number, cols: number) => IGrid = (
  rows,
  cols
) => new Grid(rows, cols)
