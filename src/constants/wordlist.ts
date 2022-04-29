type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'jallo',
        definition: 'La palabra "jallo" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Objeto que arrastra la marea y que generalmente se encuentra en las playas y callaos.',
        example: 'Fue a dar una vuelta por la playa, a ver si encontraba algún jallo.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
