type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'bucio',
        definition: 'caracola de mar grande, utilizada también como bocina antiguamente por los aborígenes canarios y hoy día en festividades.',
        example: 'Todos los años en la romería hacía sonar el bucio que daba gloria.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
