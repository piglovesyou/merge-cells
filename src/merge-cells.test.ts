import { calcRowspanFromObjectArray } from './merge-cells'

describe('lib.test.ts', () => {
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

    test('merge vertically regardless of levels', () => {
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
