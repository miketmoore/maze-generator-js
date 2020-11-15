import { IWalls, wallsFactory } from './walls'

export interface ICell {
  readonly getWalls: () => IWalls
  readonly markStart: () => void
  readonly isStart: () => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
}

class Cell implements ICell {
  private walls: IWalls = wallsFactory()
  private visited = false
  private start = false

  constructor() {}

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
    this.walls
      .toArray()
      .map(wall => !wall.isSolid())
      .some(bool => bool === true)
}

export const cellFactory = () => new Cell()
