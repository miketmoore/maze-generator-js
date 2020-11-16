import { ICoord, coordFactory } from './coord'
import { ICell, cellFactory } from './cell'
import { Direction } from './direction'
import { randInRange } from './rand'
import { IWall } from './wall'

type ExportCell = [string, boolean, boolean, boolean, boolean]

export interface ExportData {
  readonly grid: ExportCell[]
}

export interface IGrid {
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined
  readonly getRandCoord: () => ICoord
  readonly getAvailableCellWalls: (cell: ICell, cellCoord: ICoord) => IWall[]
  readonly getExportData: () => ExportData
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
  ) => ICoord | undefined = (direction, coord) => {
    let new_row = coord.row
    let new_col = coord.col
    switch (direction) {
      case 'north':
        if (coord.row === 0) {
          return undefined
        }
        new_row--
        break
      case 'east':
        if (coord.col === this.cols - 1) {
          return undefined
        }
        new_col++
        break
      case 'south':
        if (coord.row === this.rows - 1) {
          return undefined
        }
        new_row++
        break
      case 'west':
        if (coord.col === 0) {
          return undefined
        }
        new_col--
        break
    }
    return coordFactory(new_row, new_col)
  }

  public getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined = (direction, coord) => {
    const adjacentCoords = this.getAdjacentCellCoords(direction, coord)
    if (!adjacentCoords) {
      return undefined
    }
    return this.coordInBounds(adjacentCoords) ? adjacentCoords : undefined
  }

  private rowInBounds = (row: number) => row >= 0 && row < this.rows
  private colInBounds = (col: number) => col >= 0 && col < this.cols
  private coordInBounds = (coord: ICoord) => {
    return this.rowInBounds(coord.row) && this.colInBounds(coord.col)
  }

  public getRandCoord = () =>
    coordFactory(randInRange(0, this.rows - 1), randInRange(0, this.cols - 1))

  private isWallAvailable = (cellCoord: ICoord, wall: IWall) => {
    if (wall.isSolid()) {
      const adjacentCoord = this.getAdjacentCoord(
        wall.getDirection(),
        cellCoord
      )
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

  public getExportData = () => {
    const data: ExportData = { grid: [] }
    Object.keys(this.cells).forEach(key => {
      const cell = this.cells[key]
      const walls = cell.getWalls()
      data.grid.push([
        key,
        walls.north.isSolid(),
        walls.east.isSolid(),
        walls.south.isSolid(),
        walls.west.isSolid()
      ])
    })
    return data
  }
}

export const gridFactory: (rows: number, cols: number) => IGrid = (
  rows,
  cols
) => new Grid(rows, cols)
