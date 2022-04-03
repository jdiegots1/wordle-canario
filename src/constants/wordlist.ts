type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'minar',
        definition: 'Llenar o cubrir algo, generalmente de una cosa nociva o no conveniente.',
        example: 'Esa costa está minada de hoteles.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
