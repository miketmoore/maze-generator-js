import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Record<Direction, boolean>
  readonly carveWall: (direction: Direction) => void
  readonly isWallSolid: (direction: Direction) => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
  readonly getData: () => CellData
}

export interface CellData {
  readonly visited: boolean
  readonly walls: Record<Direction, boolean>
}

interface CellDataMutable {
  visited: boolean
  readonly walls: Record<Direction, boolean>
}

export class Cell implements ICell {
  private data: CellDataMutable = {
    visited: false,
    walls: {
      north: true,
      east: true,
      west: true,
      south: true
    }
  }

  public static new = () => new Cell()
  public static newFromData = (data: CellData) => {
    const cell = Cell.new()
    if (data.visited) {
      cell.markVisited()
    }
    if (!data.walls.north) cell.carveWall('north')
    if (!data.walls.east) cell.carveWall('east')
    if (!data.walls.west) cell.carveWall('west')
    if (!data.walls.south) cell.carveWall('south')
    return cell
  }
  public getData = () => this.data

  public getWalls = () => this.data.walls
  public carveWall = (direction: Direction) => {
    this.data.walls[direction] = false
  }
  public isWallSolid = (direction: Direction) =>
    this.data.walls[direction] === true
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
      (direction: Direction) => this.data.walls[direction] === false
    )
}
