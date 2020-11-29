import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Walls
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
  readonly carveWall: (direction: Direction) => void
}

export type Walls = Record<Direction, boolean>

class Cell implements ICell {
  private walls: Walls = {
    north: true,
    east: true,
    south: true,
    west: true
  }
  private visited = false

  public getWalls = () => this.walls
  public markVisited = () => (this.visited = true)
  public isVisited = () => this.visited
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
    Object.keys(this.walls).some((key: Direction) => this.walls[key] === false)
  public carveWall = (direction: Direction) => {
    this.walls[direction] = false
    this.visited = true
  }
}

export const cellFactory = () => new Cell()
