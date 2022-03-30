type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'rente',
        definition: 'A ras, de raíz; en la expresión "bobo rente", completamente, en extremo.',
        example: 'Esa mata me la cortas rente.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
