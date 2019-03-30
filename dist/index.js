"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
const carve_maze_1 = require("./carve-maze");
class MazeGen {
    constructor(options) {
        this.generate = () => carve_maze_1.carveMaze(grid_1.gridFactory(this.rows, this.cols));
        if (!options.rows) {
            throw new Error('rows is required');
        }
        if (!options.cols) {
            throw new Error('cols is required');
        }
        this.rows = options.rows;
        this.cols = options.cols;
    }
}
exports.mazeGenerator = (options) => {
    const mazeGen = new MazeGen(options);
    return mazeGen.generate();
};
