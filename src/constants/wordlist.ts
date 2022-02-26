type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'cuico',
        definition: 'Dicho de una persona, que habla o actúa con astucia o disimulo.',
        example: 'Como era muy cuico, siempre se las ingeniaba para quedar bien con el jefe.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
