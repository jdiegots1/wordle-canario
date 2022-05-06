type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'rabon',
        definition: 'La palabra "rabón" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Se aplica a lo que es más corto que lo ordinario.',
        example: 'Pelaba las papas con un cuchillito rabón que tenía.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
