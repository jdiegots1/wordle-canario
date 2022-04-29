type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'fatar',
        definition: 'La palabra "fatar" está incluída en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Meter la camisa por dentro de los pantalones y ajustarlos.',
        example: 'La madre siempre estaba pendiente de fatarle la camisa al niño.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
