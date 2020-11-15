import { Direction } from './direction'

export interface IWall {
  readonly carve: () => void
  readonly isSolid: () => boolean
  readonly getDirection: () => Direction
}

class Wall implements IWall {
  public direction: Direction
  public solid = true
  constructor(direction: Direction) {
    this.direction = direction
  }
  public carve = () => (this.solid = false)
  public isSolid = () => this.solid === true
  public getDirection = () => this.direction
}

export const wallFactory: (direction: Direction) => IWall = direction =>
  new Wall(direction)
