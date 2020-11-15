import { Direction } from './direction'

type WallState = 'solid' | 'carved'

export class Wall {
  public direction: Direction
  public state: WallState = 'solid'
  constructor(direction: Direction) {
    this.direction = direction
  }
}

const wallFactory = (direction: Direction) => new Wall(direction)

export interface IWalls {
  readonly north: Wall
  readonly east: Wall
  readonly south: Wall
  readonly west: Wall
  readonly toArray: () => Wall[]
}

class Walls implements IWalls {
  private walls: Record<Direction, Wall> = {
    north: wallFactory('north'),
    east: wallFactory('east'),
    south: wallFactory('south'),
    west: wallFactory('west')
  }
  public north = this.walls.north
  public east = this.walls.east
  public south = this.walls.south
  public west = this.walls.west
  public toArray = () => [
    this.walls.north,
    this.walls.east,
    this.walls.south,
    this.walls.west
  ]
}

export const wallsFactory: () => IWalls = () => new Walls()
