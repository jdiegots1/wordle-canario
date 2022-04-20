type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'casal',
        definition: 'Pareja de macho y hembra.',
        example: 'Como sabe que le gustan los animales, le regaló un casal de conejos.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
