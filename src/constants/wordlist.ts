type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'sitar',
        definition: 'Llamar a una persona emitiendo un sonido silbante corto y reiterado.',
        example: 'Se ofendía si lo sitaban en lugar de llamarlo por su nombre.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
