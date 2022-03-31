type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'chola',
        definition: 'Calzado cómo y ligero, que se emplea para estar en casa, ir a la playa…',
        example: 'Con el calor que hacía, no se podía andar por la playa sin cholas.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
