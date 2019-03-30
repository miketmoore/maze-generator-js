import { Direction } from './direction';
declare type WallState = 'solid' | 'carved';
export declare class Wall {
    direction: Direction;
    state: WallState;
    constructor(direction: Direction);
}
export interface IWalls {
    readonly north: Wall;
    readonly east: Wall;
    readonly south: Wall;
    readonly west: Wall;
    readonly forEach: (cb: (direction: Direction, wall: Wall) => void) => void;
}
export declare const wallsFactory: () => IWalls;
export {};
