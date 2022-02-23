type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'baifo',
        definition: 'es la cría de la cabra. Si “se te va el baifo” es que se te olvidó lo que ibas a hacer o ibas a decir',

        example: ''
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
