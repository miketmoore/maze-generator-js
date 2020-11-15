import { ICoord, coordFactory } from './coord'
import { ICell, cellFactory } from './cell'
import { Direction } from './direction'
import { randInRange } from './rand'
import { Wall } from './walls'

export interface IGrid {
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined
  readonly getRandCoord: () => ICoord
  readonly getRandCell: () => ICell
  readonly getAvailableCellWalls: (cell: ICell, cellCoord: ICoord) => Wall[]
}

class Grid implements IGrid {
  private rows: number
  private cols: number
  private cells: Record<string, ICell>
  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.cells = {}
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = this.buildKey(row, col)
        this.cells[key] = cellFactory()
      }
    }
  }

  public getCell = (coord: ICoord) => {
    const { row, col } = coord
    const key = this.buildKey(row, col)
    return this.cells[key]
  }

  private buildKey = (row: number, col: number) => `${row},${col}`

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
  }

  public getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined = (direction, coord) => {
    const adjacentCoords = this.getAdjacentCellCoords(direction, coord)
    return this.coordInBounds(adjacentCoords) ? adjacentCoords : undefined
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
    const key = this.buildKey(coord.row, coord.col)
    return this.cells[key]
  }

  private isWallAvailable = (cellCoord: ICoord, wall: Wall) => {
    if (wall.state === 'solid') {
      const adjacentCoord = this.getAdjacentCoord(wall.direction, cellCoord)
      if (adjacentCoord) {
        const adjacentCell = this.getCell(adjacentCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          return true
        }
      }
    }
    return false
  }
  // available cell walls are walls that have not been carved and that are adjacent to a cell
  // that has not been visited
  public getAvailableCellWalls = (cell: ICell, cellCoord: ICoord) =>
    cell
      .getWalls()
      .toArray()
      .filter(wall => this.isWallAvailable(cellCoord, wall))
}

export const gridFactory: (rows: number, cols: number) => IGrid = (
  rows,
  cols
) => new Grid(rows, cols)
