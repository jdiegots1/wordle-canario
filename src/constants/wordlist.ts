type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'sajar',
        definition: 'Cortar, rajar produciendo una herida.',
        example: 'Estaba arreglando el pescado y se sajó un dedo.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
