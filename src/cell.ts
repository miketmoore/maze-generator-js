import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Walls
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
  readonly carveWall: (direction: Direction) => void
  readonly getData: () => CellData
}

export interface CellData {
  visited: boolean
  walls: Walls
}

export type Walls = Record<Direction, boolean>

class Cell implements ICell {
  private data: CellData = {
    visited: false,
    walls: {
      north: true,
      east: true,
      south: true,
      west: true
    }
  }

  public getWalls = () => this.data.walls
  public markVisited = () => (this.data.visited = true)
  public isVisited = () => this.data.visited
  public getOppositeWall = (wall: number) => {
    if (wall === 0) {
      return 2
    } else if (wall === 1) {
      return 3
    } else if (wall === 2) {
      return 0
    }
    return 1
  }
  public isCarved = () =>
    Object.keys(this.data.walls).some(
      (key: Direction) => this.data.walls[key] === false
    )
  public carveWall = (direction: Direction) => {
    this.data.walls[direction] = false
    this.data.visited = true
  }
  public getData = () => this.data
}

export const cellFactory = () => new Cell()
export const cellFromData = (data: CellData) => {
  const cell = cellFactory()
  if (data.visited) cell.markVisited()
  if (!data.walls.north) cell.carveWall('north')
  if (!data.walls.east) cell.carveWall('east')
  if (!data.walls.south) cell.carveWall('south')
  if (!data.walls.west) cell.carveWall('west')
  return cell
}
