type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'arife',
        definition: 'Aire muy caliente que produce un calor sofocante.',
        example: 'Se metió un arife que acabó con las pocas plantas que quedaban.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
