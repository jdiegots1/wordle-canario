type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'fusto',
        definition: 'La palabra "fusto" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. En La Palma le llamamos al olor y sabor característicos que tienen algunos productos alimenticios.',
        example: 'Este queso tiene mucho fusto.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
