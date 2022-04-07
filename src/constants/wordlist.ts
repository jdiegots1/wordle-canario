type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'guata',
        definition: 'Trozo de algodón limpio y esterilizado para limpiar heridas.',
        example: 'La madre trajo guatas después de que se cayera el chiquillo.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
