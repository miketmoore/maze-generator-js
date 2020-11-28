import { IGrid } from './grid'
import { ICoord } from './coord'
import { Direction } from './direction'
import { ICell } from './cell'
import { Wall } from './walls'

export interface ICarveableGrid {
  readonly getGrid: () => IGrid
  readonly getCell: (coord: ICoord) => ICell | undefined
  readonly getAvailableCellWalls: (
    cell: ICell,
    cellCoord: ICoord
  ) => AvailableWall[]
  readonly getAdjacentCell: (
    direction: Direction,
    coord: ICoord
  ) => ICell | undefined
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
}

interface AvailableWall {
  readonly direction: Direction
  readonly wall: Wall
}

class CarveableGrid implements ICarveableGrid {
  private grid: IGrid
  constructor(grid: IGrid) {
    this.grid = grid
  }
  public getGrid = () => this.grid
  public getCell = (coord: ICoord) => this.grid.getCell(coord)
  public getAdjacentCell = (direction: Direction, coord: ICoord) =>
    this.grid.getAdjacentCell(direction, coord)
  public getAvailableCellWalls = (cell: ICell, cellCoord: ICoord) => {
    // available cell walls are walls that have not been carved and that are adjacent to a cell
    // that has not been visited

    const walls = cell.getWalls()
    const results: AvailableWall[] = []
    walls.forEach((direction, wall) => {
      if (wall.state === 'solid') {
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
}

export function carveGridFactory(grid: IGrid): ICarveableGrid {
  return new CarveableGrid(grid)
}
