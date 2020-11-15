import { IWalls, wallsFactory } from './walls'

export interface ICell {
  readonly getWalls: () => IWalls
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly isCarved: () => boolean
}

class Cell implements ICell {
  private walls: IWalls = wallsFactory()
  private visited = false

  constructor() {}

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
  // the cell is carved if at least one of the walls is not solid
  public isCarved = () =>
    this.walls
      .toArray()
      .map(wall => !wall.isSolid())
      .some(bool => bool === true)
}

export const cellFactory = () => new Cell()
