type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'echon',
        definition: 'La palabra "echón" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Que hace alardes de poder, riquezas o influencias.',
        example: 'Siempre fue muy echón, y por eso le tenían ojeriza.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
