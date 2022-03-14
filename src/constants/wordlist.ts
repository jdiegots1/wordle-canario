type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'borno',
        definition: 'También en femenino, aplicado a los líquidos, poco caliente, tibio.',
        example: 'Primero se lava la herida con agua bornita, y luego se le pone una venda.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
