"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CarveableGrid {
    constructor(grid) {
        this.getCell = (coord) => this.grid.getCell(coord);
        this.getAdjacentCell = (direction, coord) => this.grid.getAdjacentCell(direction, coord);
        this.getAvailableCellWalls = (cell, cellCoord) => {
            // available cell walls are walls that have not been carved and that are adjacent to a cell
            // that has not been visited
            const walls = cell.getWalls();
            const results = [];
            walls.forEach((direction, wall) => {
                if (wall.state === 'solid') {
                    const adjacentCell = this.grid.getAdjacentCell(direction, cellCoord);
                    if (adjacentCell && !adjacentCell.isVisited()) {
                        results.push(wall);
                    }
                }
            });
            return results;
        };
        this.forEachRow = (cb) => {
            this.grid.forEachRow(cb);
        };
        this.grid = grid;
    }
}
function carveGridFactory(grid) {
    return new CarveableGrid(grid);
}
exports.carveGridFactory = carveGridFactory;
