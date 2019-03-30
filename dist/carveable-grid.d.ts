import { IGrid } from './grid';
import { ICoord } from './coord';
import { Direction } from './direction';
import { ICell } from './cell';
import { Wall } from './walls';
export interface ICarveableGrid {
    readonly getCell: (coord: ICoord) => ICell;
    readonly getAvailableCellWalls: (cell: ICell, cellCoord: ICoord) => Wall[];
    readonly getAdjacentCell: (direction: Direction, coord: ICoord) => ICell | undefined;
    readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void;
}
export declare function carveGridFactory(grid: IGrid): ICarveableGrid;
