"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
const carve_maze_1 = require("./carve-maze");
class MazeGen {
    constructor(rows, cols) {
        this.generate = () => {
            const grid = grid_1.gridFactory(this.rows, this.cols);
            carve_maze_1.carveMaze(grid);
            return grid;
        };
        if (typeof rows !== 'number') {
            throw new Error('rows is required');
        }
        if (typeof cols !== 'number') {
            throw new Error('cols is required');
        }
        this.rows = rows;
        this.cols = cols;
    }
}
exports.mazeGenerator = (rows, cols) => {
    const mazeGen = new MazeGen(rows, cols);
    return mazeGen.generate();
};
