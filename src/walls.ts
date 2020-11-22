import { Direction } from './direction'

export class Wall {
  public direction: Direction
  public solid = true
  constructor(direction: Direction) {
    this.direction = direction
  }
  public carve = () => (this.solid = false)
  public isSolid = () => this.solid
}

const wallFactory = (direction: Direction) => new Wall(direction)

export interface IWalls {
  readonly north: Wall
  readonly east: Wall
  readonly south: Wall
  readonly west: Wall
  readonly forEach: (cb: (direction: Direction, wall: Wall) => void) => void
  readonly toArray: () => Wall[]
}

class Walls implements IWalls {
  private walls: Record<Direction, Wall> = {
    north: wallFactory('north'),
    east: wallFactory('east'),
    south: wallFactory('south'),
    west: wallFactory('west')
  }
  public forEach = (cb: (direction: Direction, wall: Wall) => void) => {
    Object.keys(this.walls).forEach((direction: Direction) => {
      cb(direction, this.walls[direction])
    })
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
