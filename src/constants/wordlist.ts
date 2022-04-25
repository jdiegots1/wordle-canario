type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'jacio',
        definition: 'La palabra "jacío" está incluída en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Puede ser alma momentánea del mar, la escampada al llover, o en Fuerteventura, Gran Canaria, La Gomera y La Palma nos referimos al cese momentáneo de una actividad laboral.',
        example: 'Había que esperar que hubiera un jacío para poder meter el barco en la playa.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
