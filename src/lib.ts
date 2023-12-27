export type Rowspan<T> = { [key in keyof T]: number }

interface BaseRow<T> {
    row: T
    rowspan: Rowspan<T>
}

type ValueProvider<T> = (row: T, columnName: keyof T) => any

const defaultValueProvider = <T>(row: T, columnName: keyof T) => row[columnName] as ValueProvider<T>

export function calcRowspan<T>(
    rows: T[],
    fields: (keyof T)[],
    valueProvider: ValueProvider<T> = defaultValueProvider,
    baseRows: (BaseRow<T> | undefined)[] = [],
    acc: Rowspan<T>[] = [],
): Rowspan<T>[] {
    if (rows.length == 0) return acc

    const [top, ...rest] = rows

    const rowspan = fields.reduce((acc, columnName) => {
        acc[columnName] = 1
        return acc
    }, {} as Rowspan<T>)
    const topAcc = {
        row: top,
        rowspan: rowspan,
    } as BaseRow<T>
    acc.push(rowspan)

    const nextBaseRows = [] as BaseRow<T>[]
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        const baseRow = baseRows[i]

        const isNewValue = !baseRow || valueProvider(top, field) !== valueProvider(baseRow.row, field)
        if (isNewValue) {
            return calcRowspan(
                rest,
                fields,
                valueProvider,
                [...nextBaseRows, ...Array(fields.length - nextBaseRows.length).fill(topAcc)],
                acc,
            )
        }

        baseRow.rowspan[field]++
        topAcc.rowspan[field] = 0
        nextBaseRows.push(baseRow)
    }

    return calcRowspan(rest, fields, valueProvider, nextBaseRows, acc)
}
