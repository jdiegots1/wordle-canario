type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'raspa',
        definition: 'La palabra "raspa" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Residuo de comida que queda adherido en una olla.',
        example: 'Mi abuela hacía unas natillas tan buenas, que nos comíamos hasta las raspas.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
