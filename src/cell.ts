import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Record<Direction, boolean>
  readonly carveWall: (direction: Direction) => void
  readonly isWallSolid: (direction: Direction) => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
  readonly getData: () => string
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
  public static newFromData = (data: string) => {
    const [visited, north, east, south, west] = data.split('')
    const cell = Cell.new()
    if (visited === '1') {
      cell.markVisited()
    }
    if (north === '0') cell.carveWall('north')
    if (east === '0') cell.carveWall('east')
    if (west === '0') cell.carveWall('west')
    if (south === '0') cell.carveWall('south')
    return cell
  }
  public getData = () => {
    const {
      visited,
      walls: { north, east, south, west }
    } = this.data
    return `${visited ? 1 : 0}${north ? 1 : 0}${east ? 1 : 0}${south ? 1 : 0}${
      west ? 1 : 0
    }`
  }

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
