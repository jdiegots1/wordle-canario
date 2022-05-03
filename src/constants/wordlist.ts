type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'rolar',
        definition: 'La palabra "rolar" se encuentra en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Comer triturando alimentos duros; en Lanzarote, Fuerteventura, Tenerife y La Palma también es utilizado como sinónimo de moler el grano, especialmente el millo, dejándolo grueso.',
        example: 'Estuvo rolando castañas toda la tarde.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
