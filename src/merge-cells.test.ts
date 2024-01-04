import { calcRowspanFromObjectArray, calcRowspanWithTableRows, mergeCells } from './merge-cells'
import { JSDOM } from 'jsdom'

describe('lib.test.ts', () => {
    describe('calcRowspanFromObjectArray', () => {
        test('merge two on top', () => {
            expect(
                calcRowspanFromObjectArray(
                    [
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'b', c_2: 'a' },
                    ],
                    ['c_1', 'c_2'],
                ),
            ).toStrictEqual([
                { c_1: 2, c_2: 2 },
                { c_1: 0, c_2: 0 },
                { c_1: 1, c_2: 1 },
            ])
        })

        test('merge two on bottom', () => {
            expect(
                calcRowspanFromObjectArray(
                    [
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'b', c_2: 'a' },
                        { c_1: 'b', c_2: 'a' },
                    ],
                    ['c_1', 'c_2'],
                ),
            ).toStrictEqual([
                { c_1: 1, c_2: 1 },
                { c_1: 2, c_2: 2 },
                { c_1: 0, c_2: 0 },
            ])
        })

        test('merge two on top and bottom', () => {
            expect(
                calcRowspanFromObjectArray(
                    [
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'b', c_2: 'a' },
                        { c_1: 'c', c_2: 'a' },
                        { c_1: 'c', c_2: 'a' },
                    ],
                    ['c_1', 'c_2'],
                ),
            ).toStrictEqual([
                { c_1: 2, c_2: 2 },
                { c_1: 0, c_2: 0 },
                { c_1: 1, c_2: 1 },
                { c_1: 2, c_2: 2 },
                { c_1: 0, c_2: 0 },
            ])
        })

        test('merge 1st level when values are different on 2nd level', () => {
            expect(
                calcRowspanFromObjectArray(
                    [
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'a', c_2: 'b' },
                        { c_1: 'b', c_2: 'a' },
                        { c_1: 'b', c_2: 'b' },
                    ],
                    ['c_1', 'c_2'],
                ),
            ).toStrictEqual([
                { c_1: 2, c_2: 1 },
                { c_1: 0, c_2: 1 },
                { c_1: 2, c_2: 1 },
                { c_1: 0, c_2: 1 },
            ])
        })

        test('not merge 2nd level when values are different on 1st level', () => {
            expect(
                calcRowspanFromObjectArray(
                    [
                        { c_1: 'a', c_2: 'a' },
                        { c_1: 'b', c_2: 'a' },
                        { c_1: 'c', c_2: 'a' },
                    ],
                    ['c_1', 'c_2'],
                ),
            ).toStrictEqual([
                { c_1: 1, c_2: 1 },
                { c_1: 1, c_2: 1 },
                { c_1: 1, c_2: 1 },
            ])
        })

        test('respectColumnLevels: false to merge vertically regardless of column levels', () => {
            expect(
                calcRowspanFromObjectArray(
                    [
                        { c_1: 'a', c_2: 'a', c_3: 'c' },
                        { c_1: 'a', c_2: 'b', c_3: 'c' },
                        { c_1: 'b', c_2: 'b', c_3: 'a' },
                    ],
                    ['c_1', 'c_2', 'c_3'],
                    {
                        respectColumnLevels: false,
                    },
                ),
            ).toStrictEqual([
                { c_1: 2, c_2: 1, c_3: 2 },
                { c_1: 0, c_2: 2, c_3: 0 },
                { c_1: 1, c_2: 0, c_3: 1 },
            ])
        })
    })

    describe('mergeCells', () => {
        test('merge cells', () => {
            document.body.innerHTML = `<!DOCTYPE html>
            <table>
                <tr>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>2</td>
                </tr>
            </table>`
            const table = document.querySelector('table') as HTMLTableElement
            mergeCells(table)
            expect(table.innerHTML).toMatchInlineSnapshot(`
"
                <tbody><tr>
                    <td rowspan="3">1</td>
                    <td rowspan="2">1</td>
                </tr>
                <tr>
                    <td style="display: none;">1</td>
                    <td style="display: none;">1</td>
                </tr>
                <tr>
                    <td style="display: none;">1</td>
                    <td rowspan="1">2</td>
                </tr>
                <tr>
                    <td rowspan="1">2</td>
                    <td rowspan="1">2</td>
                </tr>
            </tbody>"
`)
        })

        test('pass with an empty table', () => {
            document.body.innerHTML = `<!DOCTYPE html>
            <table></table>`
            const table = document.querySelector('table') as HTMLTableElement
            mergeCells(table)
            expect(table.innerHTML).toMatchInlineSnapshot(`""`)
        })
    })

    describe('calcRowspanWithTableRows', () => {
        test('pass with empty rows', () => {
            expect(calcRowspanWithTableRows({} as HTMLCollectionOf<HTMLTableRowElement>, undefined, {})).toStrictEqual(
                [],
            )
        })
    })
})
