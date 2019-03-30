"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coord {
    constructor(row, col) {
        this.toString = () => `[${this.row},${this.col}]`;
        this.row = row;
        this.col = col;
    }
}
exports.coordFactory = (row, col) => new Coord(row, col);
