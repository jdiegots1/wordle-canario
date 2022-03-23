type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'momio',
        definition: 'Blando, flojo, sin consistencia, que no tiene la tensión que naturalmente debe tener.',
        example: 'Esos plátanos están muy maduros, medio momios.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
