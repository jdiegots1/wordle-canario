type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'tonga',
        definition: 'Porción de cosas apiladas en orden; gran abundancia de cosas; o un conjunto grande de personas o animales.',
        example: 'En la mesa dejó una tonga de libros.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
