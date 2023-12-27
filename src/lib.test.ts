import { calcRowspan } from './lib'

describe('lib.test.ts', () => {
    test('merge two on top', () => {
        expect(
            calcRowspan(
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
            calcRowspan(
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
            calcRowspan(
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
            calcRowspan(
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
            calcRowspan(
                [
                    { c_1: 'a', c_2: 'a' },
                    { c_1: 'b', c_2: 'a' },
                    { c_1: 'c', c_2: 'a' },
                ],
                ['c_1', 'c_2'],
            ),
        ).toStrictEqual([
            { c_2: 1, c_1: 1 },
            { c_2: 1, c_1: 1 },
            { c_2: 1, c_1: 1 },
        ])
    })
})
