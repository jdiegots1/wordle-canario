type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'teque',
        definition: 'Palabra que, usada reiteradamente, se emplea con el significado de paso a paso.',
        example: 'A las siete de la mañana ya lo ves teque teque para el trabajo.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
