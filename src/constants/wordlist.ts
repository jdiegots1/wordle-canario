type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'urrar',
        definition: 'dar urridos: la voz característa de las reses vacunas o también puede ser un grito fuerte y desgarrado a causa de un dolor.',
        example: 'El pibe empezó a urrar cuando su meñique golpeó el mueble.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
