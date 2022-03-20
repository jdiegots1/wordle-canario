type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'rosca',
        definition: 'Grano de millo que, al tostarse o freírse, se abre en forma de flor.',
        example: 'Antes de entrar al cine, compramos roscas.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
