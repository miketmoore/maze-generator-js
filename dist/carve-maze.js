"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carveable_grid_1 = require("./carveable-grid");
const rand_1 = require("./rand");
function carveMaze(grid) {
    const cell = grid.getRandCell();
    cell.markStart();
    const carveableGrid = carveable_grid_1.carveGridFactory(grid);
    carve(carveableGrid, [cell]);
}
exports.carveMaze = carveMaze;
const getOppositeDirection = direction => {
    if (direction === 'north') {
        return 'south';
    }
    else if (direction === 'east') {
        return 'west';
    }
    else if (direction === 'south') {
        return 'north';
    }
    return 'east';
};
function carve(carveableGrid, history) {
    const cell = history[history.length - 1];
    // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
    const walls = carveableGrid.getAvailableCellWalls(cell, cell.getCoord());
    // get random wall from results
    if (walls.length === 0) {
        if (history.length >= 2) {
            const backtrackedCell = history.pop();
            if (backtrackedCell) {
                backtrackedCell.markPopped();
            }
            carve(carveableGrid, history);
            return;
        }
        return;
    }
    const wallIndex = rand_1.randInRange(0, walls.length);
    const wall = walls[wallIndex];
    wall.state = 'carved';
    cell.markVisited();
    const adjacentCell = carveableGrid.getAdjacentCell(wall.direction, cell.getCoord());
    if (adjacentCell) {
        if (!adjacentCell.isVisited()) {
            const oppDir = getOppositeDirection(wall.direction);
            adjacentCell.getWalls()[oppDir].state = 'carved';
            adjacentCell.markVisited();
            history.push(adjacentCell);
            carve(carveableGrid, history);
        }
    }
}
