type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'tarro',
        definition: 'La palabra "tarro" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Cuerno de los animales.',
        example: 'A la cabra que tiene los tarros abiertos la llaman ballestera.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
