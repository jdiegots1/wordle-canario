type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'chopa',
        definition: 'Nariz, especialmente abultada. En Gran Canaria, Lanzarote y La Palma se les llama a las cucarachas de tamaño grande, que se les conoce como salema en otras zonas de Canarias.',
        example: 'Con el catarro, tenía la chopa roja de tanto sonarse.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
