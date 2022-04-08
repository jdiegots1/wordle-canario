type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'cucar',
        definition: 'Nos podemos referir a tocar a alguien cautelosamente, sobre todo con el codo o con el pie, en demanda de complicidad; o incitar con malicia.',
        example: 'Cuando nos llamaban la atención, se ponía a cucarme para hacerme reír.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
