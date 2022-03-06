type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'piola',
        definition: 'Juego que consiste en saltar, según ciertas reglas, por encima de uno que se pone encorvado cantidad de personas.',
        example: 'Mi padre era un puntal jugando a la piola cuando era un chinijo.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
