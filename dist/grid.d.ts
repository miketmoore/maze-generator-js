import { ICoord } from './coord';
import { ICell } from './cell';
import { Direction } from './direction';
export interface IGrid {
    readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void;
    readonly getCell: (coord: ICoord) => ICell;
    readonly getAdjacentCell: (direction: Direction, coord: ICoord) => ICell | undefined;
    readonly getRandCell: () => ICell;
}
export declare const gridFactory: (rows: number, cols: number) => IGrid;
