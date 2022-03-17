type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'mamar',
        definition: 'Obtener provecho indebidamente a costa de otro, de empresas o de instituciones públicas o privadas; tomar para sí lo ajeno, birlar.',
        example: 'La política canaria está llena de mamones.'
    },.
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
