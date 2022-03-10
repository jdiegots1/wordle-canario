type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'brega',
        definition: 'Acción de bregar, que es competir en el deporte de la lucha canaria.',
        example: 'El puntal del equipo local dejó fuera de brega a tres luchadores del equipo visitante..'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
