type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'chijo',
        definition: 'Puede ser un chorro delgado de cualquier líquido, sobre todo cuando sale a presión; pequeña porción de vino u otro líquido que se bebe o se puede beber de una vez; y en Lanzarote, Fuerteventura y Tenerife es sinónimo de miedo.',
        example: 'De la fuente ya no venía sino un chijito de agua.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
