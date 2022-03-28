type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'venta',
        definition: 'Así le llamamos en Fuerteventura, Tenerife y La Palma a las tiendas de comestibles.',
        example: 'En la venta trabajaba toda la familia.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
