import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Walls
  readonly markStart: () => void
  readonly isStart: () => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly markPopped: () => void
  readonly isPopped: () => boolean
  readonly isCarved: () => boolean
  readonly carveWall: (direction: Direction) => void
}

export type Walls = Record<Direction, boolean>

class Cell implements ICell {
  private popped: boolean
  private walls: Walls = {
    north: true,
    east: true,
    south: true,
    west: true
  }
  private visited = false
  private start = false

  public isPopped = () => this.popped
  public markPopped = () => (this.popped = true)
  public getWalls = () => this.walls
  public markVisited = () => (this.visited = true)
  public markStart = () => (this.start = true)
  public isStart = () => this.start
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
