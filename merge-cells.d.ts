type ColumnKey = string | number;
export type Rowspan<K extends ColumnKey> = {
    [key in K]: number;
};
interface BaseRow<E, K extends ColumnKey> {
    row: E;
    rowspan: Rowspan<K>;
}
interface Options {
    respectColumnLevels?: boolean;
}
type ValueProvider<E, K extends ColumnKey> = (row: E, columnKey: K) => any;
export declare function calcRowspanRecur<E, K extends ColumnKey>(rows: E[], fields: K[], // Object keys or array indexes
valueProvider: ValueProvider<E, K>, options: Options, baseRows?: (BaseRow<E, K> | undefined)[], acc?: Rowspan<K>[]): Rowspan<K>[];
export declare function applyRowspanToTable(tableEl: HTMLTableElement, columnIndexes?: number[], options?: Options): void;
export declare function calcRowspanWithTableRows(rows: HTMLCollectionOf<HTMLTableRowElement>, columnIndexes: number[] | undefined, options: Options): Rowspan<number>[];
export declare function calcRowspanFromObjectArray<E extends Record<string, any>>(rows: E[], columnKeys: string[], options?: Options): Rowspan<string>[];
export declare const mergeCells: typeof applyRowspanToTable;
export default mergeCells;
//# sourceMappingURL=merge-cells.d.ts.map