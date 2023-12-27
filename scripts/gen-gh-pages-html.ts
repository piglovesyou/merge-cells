import { renderFile } from 'pug'
import { join } from 'path'
import { writeFile } from 'fs/promises'
import makeDir from 'make-dir'

const label = '🍲 done'
console.time(label)
main().then(() => console.timeEnd(label))

async function main() {
    const html = renderFile(join(__dirname, 'index.pug'), {
        pretty: true,
        pageTitle: '🍲 merge-cells',
    })
    await makeDir(join(__dirname, '../dist'))
    await writeFile(join(__dirname, '../dist', 'index.html'), html)
}
