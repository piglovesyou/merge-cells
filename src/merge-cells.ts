type ColumnKey = string | number

export type Rowspan<K extends ColumnKey> = { [key in K]: number }

interface BaseRow<E, K extends ColumnKey> {
    row: E
    rowspan: Rowspan<K>
}

interface Options {
    respectColumnLevels?: boolean
}

type ValueProvider<E, K extends ColumnKey> = (row: E, columnKey: K) => any

const defaultOptions: Options = {
    respectColumnLevels: true,
}

export function calcRowspanRecur<E, K extends ColumnKey>(
    rows: E[],
    fields: K[], // Object keys or array indexes
    valueProvider: ValueProvider<E, K>,
    options: Options,
    baseRows: (BaseRow<E, K> | undefined)[] = [],
    acc: Rowspan<K>[] = [],
): Rowspan<K>[] {
    if (rows.length == 0) return acc

    const [top, ...rest] = rows

    const rowspan = fields.reduce((acc, columnName) => {
        acc[columnName] = 1
        return acc
    }, {} as Rowspan<K>)
    const topAcc = {
        row: top,
        rowspan: rowspan,
    } as BaseRow<E, K>
    acc.push(rowspan)

    const nextBaseRows = options.respectColumnLevels ? ([] as BaseRow<E, K>[]) : baseRows

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        const baseRow = baseRows[i]

        const isNewValue = !baseRow || valueProvider(top, field) !== valueProvider(baseRow.row, field)

        if (isNewValue) {
            if (options.respectColumnLevels) {
                return calcRowspanRecur(
                    rest,
                    fields,
                    valueProvider,
                    options,
                    [...nextBaseRows, ...Array(fields.length - nextBaseRows.length).fill(topAcc)],
                    acc,
                )
            } else {
                baseRows[i] = topAcc
            }
        } else {
            baseRows[i]!!.rowspan[field]++
            topAcc.rowspan[field] = 0
            if (options.respectColumnLevels) {
                nextBaseRows.push(baseRow)
            }
        }
    }

    return calcRowspanRecur(rest, fields, valueProvider, options, nextBaseRows, acc)
}

export function applyRowspanToTable(
    tableEl: HTMLTableElement,
    columnIndexes?: number[],
    options: Options = defaultOptions,
) {
    for (let tBody of tableEl.tBodies) {
        tBody.remove() // To avoid reflow

        const rowspans = calcRowspanWithTableRows(tBody.rows, columnIndexes, options)

        for (let i = 0; i < tBody.rows.length; i++) {
            const rowEl = tBody.rows.item(i)!!
            const rowspan = rowspans[i]

            for (let j = 0; j < rowEl.cells.length; j++) {
                const cellEl = rowEl.cells.item(j)!!
                if (rowspan[j] === 0) cellEl.style.display = 'none'
                else cellEl.setAttribute('rowspan', rowspan[j].toString())
            }
        }

        tableEl.appendChild(tBody)
    }
}

export function calcRowspanWithTableRows(
    rows: HTMLCollectionOf<HTMLTableRowElement>,
    columnIndexes: number[] = rows[0] ? Array.from(Array(rows[0].cells.length).keys()) : [],
    options: Options,
) {
    return calcRowspanRecur(
        Array.from(rows),
        columnIndexes,
        (row, fieldIndex) => row.cells[fieldIndex]!!.textContent,
        options,
    )
}

export function calcRowspanFromObjectArray<E extends Record<string, any>>(
    rows: E[],
    columnKeys: string[],
    options: Options = defaultOptions,
): Rowspan<string>[] {
    return calcRowspanRecur(rows, columnKeys, (row, field) => row[field]!!, options)
}

export const mergeCells = applyRowspanToTable
export default mergeCells
