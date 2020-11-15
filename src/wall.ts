import { Direction } from './direction'

type WallState = 'solid' | 'carved'

export interface IWall {
  readonly carve: () => void
  readonly isSolid: () => boolean
  readonly getDirection: () => Direction
}

class Wall implements IWall {
  public direction: Direction
  public state: WallState = 'solid'
  constructor(direction: Direction) {
    this.direction = direction
  }
  public carve = () => (this.state = 'carved')
  public isSolid = () => this.state === 'solid'
  public getDirection = () => this.direction
}

export const wallFactory: (direction: Direction) => IWall = direction =>
  new Wall(direction)
