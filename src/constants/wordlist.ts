type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'gamia',
        definition: 'Pequeña porción de gofio en polvo que se coge con los dedos o con una cuchara y que se usa como tapa para acompañar el vino.',
        example: 'Tu tía Cathaysa se conforma con una gamia y un vasito de vino.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
