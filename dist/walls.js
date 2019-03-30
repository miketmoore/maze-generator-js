"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wall {
    constructor(direction) {
        this.state = 'solid';
        this.direction = direction;
    }
}
exports.Wall = Wall;
const wallFactory = (direction) => new Wall(direction);
// const Walls = {
//   north: wallFactory(),
//   east: wallFactory(),
//   south: wallFactory(),
//   west: wallFactory(),
//   forEach: (cb: (direction: Direction, wall: Wall) => void) => {
//     Object.keys(this).forEach((direction: Direction) => {
//       cb(direction, this[direction])
//     })
//   }
// }
class Walls {
    constructor() {
        this.walls = {
            north: wallFactory('north'),
            east: wallFactory('east'),
            south: wallFactory('south'),
            west: wallFactory('west')
        };
        this.forEach = (cb) => {
            Object.keys(this.walls).forEach((direction) => {
                cb(direction, this.walls[direction]);
            });
        };
        this.north = this.walls.north;
        this.east = this.walls.east;
        this.south = this.walls.south;
        this.west = this.walls.west;
    }
}
exports.wallsFactory = () => new Walls();
