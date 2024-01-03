# merge-cells [![Node.js CI](https://github.com/piglovesyou/merge-cells/actions/workflows/node.js.yml/badge.svg)](https://github.com/piglovesyou/merge-cells/actions/workflows/node.js.yml)

Provide JavaScript/TypeScript functions to help you merge cells of an HTML `GROUP BY`-like table.

👉 Example: https://piglovesyou.github.io/merge-cells/

## Usage

Example usage in a browser:

```html
<script type="module" defer>
    import { mergeCells } from 'https://cdn.jsdelivr.net/npm/merge-cells@latest/dist/merge-cells.min.js'

    const tableEl = document.getElementById('table')
    mergeCells(tableEl)
</script>
```

Example usage in Node.js:

```shell
npm install merge-cells
```

```ts
import { calcRowspanFromObjectArray } from 'merge-cells'

calcRowspanFromObjectArray(
    [
        { c_1: 'a', c_2: 'a' },
        { c_1: 'a', c_2: 'a' },
        { c_1: 'b', c_2: 'a' },
    ],
    ['c_1', 'c_2'],
)
// returns: [
//   { c_1: 2, c_2: 2 },
//   { c_1: 0, c_2: 0 },
//   { c_1: 1, c_2: 1 }
// ]
```

### `mergeCells`

Apply `rowspan` to an HTML table, calculated by `calcRowspanFromObjectArray`. Signature:

```ts
function mergeCells(tableEl: HTMLTableElement, columnIndexes?: number[]): void
```

Example:

```ts
const tableEl = document.getElementById('table') as HTMLTableElement

mergeCells(tableEl)
```

### `calcRowspanFromObjectArray`

Calculate the `rowspan` of each cell in JavaScript object rows. Useful for flexible usage such as in server-side
rendering. Signature:

```ts
function calcRowspanFromObjectArray<E extends Record<string, any>>(
    rows: E[],
    columnKeys: string[],
): Record<string, number>
```

Example:

```ts
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
```

## Publishing

```shell
yarn version --patch  # or --minor or --major
```
