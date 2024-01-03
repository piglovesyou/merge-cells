type ColumnKey = string | number;
export type Rowspan<K extends ColumnKey> = {
    [key in K]: number;
};
interface BaseRow<E, K extends ColumnKey> {
    row: E;
    rowspan: Rowspan<K>;
}
type ValueProvider<E, K extends ColumnKey> = (row: E, columnKey: K) => any;
export declare function calcRowspanRecur<E, K extends ColumnKey>(rows: E[], fields: K[], // Object keys or array indexes
valueProvider: ValueProvider<E, K>, baseRows?: (BaseRow<E, K> | undefined)[], acc?: Rowspan<K>[]): Rowspan<K>[];
export declare function applyRowspanToTable(tableEl: HTMLTableElement, columnIndexes?: number[]): void;
export declare function calcRowspanWithTableRows(rows: HTMLCollectionOf<HTMLTableRowElement>, columnIndexes?: number[]): Rowspan<number>[];
export declare function calcRowspanFromObjectArray<E extends Record<string, any>>(rows: E[], columnKeys: string[]): Rowspan<string>[];
export declare const mergeCells: typeof applyRowspanToTable;
export default mergeCells;
//# sourceMappingURL=merge-cells.d.ts.map