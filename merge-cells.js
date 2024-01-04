const defaultOptions = {
    respectColumnLevels: true,
};
export function calcRowspanRecur(rows, fields, // Object keys or array indexes
valueProvider, options, baseRows = [], acc = []) {
    if (rows.length == 0)
        return acc;
    const [top, ...rest] = rows;
    const rowspan = fields.reduce((acc, columnName) => {
        acc[columnName] = 1;
        return acc;
    }, {});
    const topAcc = {
        row: top,
        rowspan: rowspan,
    };
    acc.push(rowspan);
    const nextBaseRows = options.respectColumnLevels ? [] : baseRows;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const baseRow = baseRows[i];
        const isNewValue = !baseRow || valueProvider(top, field) !== valueProvider(baseRow.row, field);
        if (isNewValue) {
            if (options.respectColumnLevels) {
                return calcRowspanRecur(rest, fields, valueProvider, options, [...nextBaseRows, ...Array(fields.length - nextBaseRows.length).fill(topAcc)], acc);
            }
            else {
                baseRows[i] = topAcc;
            }
        }
        else {
            baseRows[i].rowspan[field]++;
            topAcc.rowspan[field] = 0;
            if (options.respectColumnLevels) {
                nextBaseRows.push(baseRow);
            }
        }
    }
    return calcRowspanRecur(rest, fields, valueProvider, options, nextBaseRows, acc);
}
export function applyRowspanToTable(tableEl, columnIndexes) {
    for (let tBody of tableEl.tBodies) {
        tBody.remove(); // To avoid reflow
        const rowspans = calcRowspanWithTableRows(tBody.rows, columnIndexes);
        for (let i = 0; i < tBody.rows.length; i++) {
            const rowEl = tBody.rows.item(i);
            const rowspan = rowspans[i];
            for (let j = 0; j < rowEl.cells.length; j++) {
                const cellEl = rowEl.cells.item(j);
                if (rowspan[j] === 0)
                    cellEl.style.display = 'none';
                else
                    cellEl.setAttribute('rowspan', rowspan[j].toString());
            }
        }
        tableEl.appendChild(tBody);
    }
}
export function calcRowspanWithTableRows(rows, columnIndexes = rows[0] ? Array.from(Array(rows[0].cells.length).keys()) : [], options = defaultOptions) {
    return calcRowspanRecur(Array.from(rows), columnIndexes, (row, fieldIndex) => row.cells[fieldIndex].textContent, options);
}
export function calcRowspanFromObjectArray(rows, columnKeys, options = defaultOptions) {
    return calcRowspanRecur(rows, columnKeys, (row, field) => row[field], options);
}
export const mergeCells = applyRowspanToTable;
export default mergeCells;
