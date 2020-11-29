import { IGrid } from './grid'
import { ICoord } from './coord'
import { Direction } from './direction'
import { ICell } from './cell'

export interface ICarveableGrid {
  readonly getGrid: () => IGrid
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAvailableCellWalls: (
    cell: ICell,
    cellCoord: ICoord
  ) => AvailableWall[]
  readonly getAdjacentCoord: (
    direction: Direction,
    coord: ICoord
  ) => ICoord | undefined
  readonly getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly carveWall: (coord: ICoord, direction: Direction) => void
}

interface AvailableWall {
  readonly wall: boolean
  readonly direction: Direction
}

class CarveableGrid implements ICarveableGrid {
  private grid: IGrid
  constructor(grid: IGrid) {
    this.grid = grid
  }
  public getGrid = () => this.grid
  public getCell = (coord: ICoord) => this.grid.getCell(coord)
  public getAdjacentCoord = (direction: Direction, coord: ICoord) =>
    this.grid.getAdjacentCoord(direction, coord)
  public getAdjacentCell = (direction: Direction, coord: ICoord) =>
    this.grid.getAdjacentCell(direction, coord)
  public getAvailableCellWalls = (cell: ICell, cellCoord: ICoord) => {
    // available cell walls are walls that have not been carved and that are adjacent to a cell
    // that has not been visited

    const walls = cell.getWalls()
    const results: AvailableWall[] = []
    Object.keys(walls).forEach((direction: Direction) => {
      const wall = walls[direction]
      if (wall) {
        const adjacentCell = this.grid.getAdjacentCell(direction, cellCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          results.push({ wall, direction })
        }
      }
    })

    return results
  }
  public forEachRow = (cb: (row: ICell[], rowIndex: number) => void) => {
    this.grid.forEachRow(cb)
  }
  public carveWall = (coord: ICoord, direction: Direction) => {
    // const cell = this.getCell(coord)
    // if (!cell) throw new Error('cell not found')
    // cell.carveWall(direction)
    this.grid.carveWall(coord, direction)
  }
}

export function carveGridFactory(grid: IGrid): ICarveableGrid {
  return new CarveableGrid(grid)
}
