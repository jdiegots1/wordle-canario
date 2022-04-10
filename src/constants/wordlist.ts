type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'jalio',
        definition: 'Mar agitada en la costa por el continuo oleaje. En las islas orientales se le llama así a la respiración dificultados. En Fuerteventura, al bramido del viento.',
        example: 'El agua estaba muy revuelta, porque había jalío.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
