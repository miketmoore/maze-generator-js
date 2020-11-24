import { ICoord } from './coord'
import { Direction } from './direction'

export interface ICell {
  readonly getWalls: () => Record<Direction, boolean>
  readonly carveWall: (direction: Direction) => void
  readonly isWallSolid: (direction: Direction) => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly getCoord: () => ICoord
  readonly isCarved: () => boolean
}

class Cell implements ICell {
  private data = {
    visited: false,
    walls: {
      north: true,
      east: true,
      west: true,
      south: true
    }
  }
  private coord: ICoord

  constructor(coord: ICoord) {
    this.coord = coord
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
  public getCoord = () => this.coord
  public isCarved = () =>
    Object.keys(this.data.walls).some(
      (direction: Direction) => this.data.walls[direction] === false
    )
}

export const cellFactory = (coord: ICoord) => new Cell(coord)
