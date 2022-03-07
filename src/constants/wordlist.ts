type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'tajul',
        definition: 'En Fuerteventura, Tenerife y La Palma se emplea para llamar a una persona que come en exceso y con ansia, comilón; en Fuerteventura o Tenerife también para llamar a una persona grande; mientras que en Gran Canaria se usa para llamar a una persona excesivamente alta.',
        example: 'Se embostó porque es un tajul.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
