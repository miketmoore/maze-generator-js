export interface ICoord {
    readonly row: number;
    readonly col: number;
    readonly toString: () => string;
}
export declare const coordFactory: (row: number, col: number) => ICoord;
