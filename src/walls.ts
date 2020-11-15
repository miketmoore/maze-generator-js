import { Direction } from './direction'
import { IWall, wallFactory } from './wall'

export interface IWalls {
  readonly north: IWall
  readonly east: IWall
  readonly south: IWall
  readonly west: IWall
  readonly toArray: () => IWall[]
}

class Walls implements IWalls {
  private walls: Record<Direction, IWall> = {
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
