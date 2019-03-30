import { IWalls } from './walls';
import { ICoord } from './coord';
export interface ICell {
    readonly getWalls: () => IWalls;
    readonly markStart: () => void;
    readonly isStart: () => boolean;
    readonly markVisited: () => void;
    readonly isVisited: () => boolean;
    readonly getOppositeWall: (wall: number) => number;
    readonly getCoord: () => ICoord;
    readonly markPopped: () => void;
    readonly isPopped: () => boolean;
}
declare class Cell implements ICell {
    private popped;
    private walls;
    private visited;
    private start;
    private coord;
    constructor(coord: ICoord);
    isPopped: () => boolean;
    markPopped: () => boolean;
    getWalls: () => IWalls;
    markVisited: () => boolean;
    markStart: () => boolean;
    isStart: () => boolean;
    isVisited: () => boolean;
    getOppositeWall: (wall: number) => 0 | 1 | 2 | 3;
    getCoord: () => ICoord;
}
export declare const cellFactory: (coord: ICoord) => Cell;
export {};
