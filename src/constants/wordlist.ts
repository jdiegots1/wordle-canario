type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'jeito',
        definition: 'Puede ser un novimiento brusco, que puede producir una torcedura, y también la maña o habilidad para hacer algo.',
        example: 'El abuelo era el que tenía más jeito para tocar el timple.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
