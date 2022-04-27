type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'criar',
        definition: 'La palabra "criar" está incluída en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Infectarse una herida llenándose de pus.',
        example: 'Enseguida le puso agua oxigenada en la herida para que no le criara.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
