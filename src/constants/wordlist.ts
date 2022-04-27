type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'sabro',
        definition: 'La palabra "sabro" está incluída en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. La sabro es una variedad de uva (Vitis vinifera) blanca autóctona de las Islas Canarias.',
        example: ''
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
