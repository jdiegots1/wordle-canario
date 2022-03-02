type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'tolmo',
        definition: 'Piedra grande',
        example: 'Con las lluvias cayeron unos tolmos a la carretera que impidieron la circulación.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
