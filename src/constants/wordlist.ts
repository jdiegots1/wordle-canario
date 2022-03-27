type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'mecha',
        definition: 'Embuste, mentira de consideración.',
        example: '¡Fuerte mecha le metió con lo de que se iba a casar!'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
