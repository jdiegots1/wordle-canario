type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'lasca',
        definition: 'Trozo ancho, largo y poco grueso que se corta de una cosa.',
        example: 'Puso en un plato unas lascas de queso y de jamón.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
