"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walls_1 = require("./walls");
class Cell {
    constructor(coord) {
        this.walls = walls_1.wallsFactory();
        this.visited = false;
        this.start = false;
        this.isPopped = () => this.popped;
        this.markPopped = () => (this.popped = true);
        this.getWalls = () => this.walls;
        this.markVisited = () => (this.visited = true);
        this.markStart = () => (this.start = true);
        this.isStart = () => this.start;
        this.isVisited = () => this.visited;
        this.getOppositeWall = (wall) => {
            if (wall === 0) {
                return 2;
            }
            else if (wall === 1) {
                return 3;
            }
            else if (wall === 2) {
                return 0;
            }
            return 1;
        };
        this.getCoord = () => this.coord;
        this.coord = coord;
    }
}
exports.cellFactory = (coord) => new Cell(coord);
