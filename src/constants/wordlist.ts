type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'iscar',
        definition: 'La palabra "iscar" está incluída en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Es ponerle carnada al anzuelo, y en Tenerife y La Palma se refiere sobre todo a las papas, cuando comienza a pudrirse los frutos por efecto de condiciones metereológicas adversas.',
        example: 'Se iscaron las papas de tanta agua.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
