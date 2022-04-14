type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'gongo',
        definition: 'Pequeño hoyo semiesférico utilizado por los niños en el juego del boliche.',
        example: 'Muchos chicos eran capaces de meter el boliche en el gongo desde lejos.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
