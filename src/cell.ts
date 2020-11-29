import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Walls
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
  readonly carveWall: (direction: Direction) => void
  readonly getData: () => Walls
}

export interface CellData {
  visited: boolean
  walls: Walls
}

export type Walls = Record<Direction, boolean>

const combinationStrings = {
  '0000': true,
  '1111': true,
  '0001': true,
  '0011': true,
  '0111': true,
  '1110': true,
  '1100': true,
  '1000': true,
  '1001': true,
  '0110': true,
  '0010': true,
  '0100': true,
  '1101': true,
  '1011': true,
  '0101': true,
  '1010': true
}

const toBool = (v: string) => v === '1'
const combinationObjects: Walls[] = Object.keys(combinationStrings).map(
  combo => {
    const [north, east, south, west] = combo.split('')
    return {
      north: toBool(north),
      east: toBool(east),
      south: toBool(south),
      west: toBool(west)
    }
  }
)
console.log(combinationObjects)

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
  public getData = () => {
    const ref = combinationObjects.find(a => {
      return (
        a.north === this.data.walls.north &&
        a.east === this.data.walls.east &&
        a.south === this.data.walls.south &&
        a.west === this.data.walls.west
      )
    })
    if (!ref)
      throw new Error(
        'data not found ' + JSON.stringify(this.data, undefined, 2)
      )
    return ref
  }
}

export const cellFactory = () => new Cell()
export const cellFromData = (data: Walls) => {
  const cell = cellFactory()
  let visited = false
  if (!data.north) {
    cell.carveWall('north')
    visited = true
  }
  if (!data.east) {
    cell.carveWall('east')
    visited = true
  }
  if (!data.south) {
    cell.carveWall('south')
    visited = true
  }
  if (!data.west) {
    cell.carveWall('west')
    visited = true
  }
  if (visited) cell.markVisited()
  return cell
}
