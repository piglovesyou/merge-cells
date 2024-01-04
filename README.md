# merge-cells [![Node.js CI](https://github.com/piglovesyou/merge-cells/actions/workflows/node.js.yml/badge.svg)](https://github.com/piglovesyou/merge-cells/actions/workflows/node.js.yml) [![npm version](https://badge.fury.io/js/merge-cells.svg)](https://badge.fury.io/js/merge-cells) [![npm](https://img.shields.io/npm/dw/merge-cells)](https://www.npmjs.com/package/merge-cells) [![Codecov](https://img.shields.io/codecov/c/github/piglovesyou/merge-cells)](https://app.codecov.io/github/piglovesyou/merge-cells)

Provide JavaScript/TypeScript functions to help you merge cells with vertically the same values.

👉 Example: https://piglovesyou.github.io/merge-cells/

## Usage

Example usage in a browser:

```html
<script type="module" defer>
    import { mergeCells } from 'https://cdn.jsdelivr.net/npm/merge-cells@latest'

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

## Available functions

### `mergeCells`

Apply `rowspan` to an HTML table, calculated by `calcRowspanFromObjectArray`. Signature:

```ts
function mergeCells(tableEl: HTMLTableElement, columnIndexes?: number[], options?: Options): void
```

### `calcRowspanFromObjectArray`

Calculate the `rowspan` of each cell in JavaScript object rows. Useful in a context of server-side
rendering. Signature:

```ts
function calcRowspanFromObjectArray<E extends Record<string, any>>(
    rows: E[],
    columnKeys: string[],
    options?: Options,
): Record<string, number>
```

### `Options`

| property              | default value | description                                                                                                                 |
| --------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `respectColumnLevels` | `true`        | Whether to merge/separate cells based on column levels. Leave it to `true` if you can aggregate your table with `GROUP BY`. |

## Publishing

```shell
yarn version --patch  # or --minor or --major
```
