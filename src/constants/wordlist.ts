type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'mareo',
        definition: 'Persona que molesta o importuna a causa de su insistencia o monotonía.',
        example: 'Llévate al mareo este de aquí, que me tiene la cabeza loca.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
