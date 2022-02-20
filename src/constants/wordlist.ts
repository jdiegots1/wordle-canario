type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'zafra',
        definition: 'del verbo asar.',
        example: 'hola qué haces',
    },
    {
        word: 'tollo',
        definition: 'persona torpe, ruda, tarda en comprender.',
        example: 'En el último partido los jugadores de Las Palmas parecían unos tollos.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
