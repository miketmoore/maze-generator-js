"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coord_1 = require("./coord");
const cell_1 = require("./cell");
const rand_1 = require("./rand");
class Grid {
    constructor(rows, cols) {
        this.forEachRow = (cb) => {
            this.cells.forEach((row, rowIndex) => {
                cb(row, rowIndex);
            });
        };
        this.getCell = (coord) => this.cells[coord.row][coord.col];
        this.getAdjacentCellCoords = (direction, coord) => {
            switch (direction) {
                case 'north':
                    return coord_1.coordFactory(coord.row - 1, coord.col);
                case 'east':
                    return coord_1.coordFactory(coord.row, coord.col + 1);
                case 'south':
                    return coord_1.coordFactory(coord.row + 1, coord.col);
                case 'west':
                    return coord_1.coordFactory(coord.row, coord.col - 1);
            }
            return coord_1.coordFactory(-1, -1);
        };
        this.getAdjacentCell = (direction, coord) => {
            const adjacentCoords = this.getAdjacentCellCoords(direction, coord);
            return this.coordInBounds(adjacentCoords)
                ? this.getCell(adjacentCoords)
                : undefined;
        };
        this.rowInBounds = (row) => row >= 0 && row < this.rows;
        this.colInBounds = (col) => col >= 0 && col < this.cols;
        this.coordInBounds = (coord) => {
            return this.rowInBounds(coord.row) && this.colInBounds(coord.col);
        };
        this.getRandCoord = () => coord_1.coordFactory(rand_1.randInRange(0, this.rows - 1), rand_1.randInRange(0, this.cols - 1));
        this.getRandCell = () => {
            const coord = this.getRandCoord();
            return this.cells[coord.row][coord.col];
        };
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        for (let row = 0; row < rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < cols; col++) {
                this.cells[row][col] = cell_1.cellFactory(coord_1.coordFactory(row, col));
            }
        }
    }
}
exports.gridFactory = (rows, cols) => new Grid(rows, cols);
