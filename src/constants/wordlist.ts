type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'murga',
        definition: 'Agrupación carnavalesca que, acompañándose de instrumentos de imitación, toca canciones muy conocidas o de actualidad adaptándoles una letra satírica',
        example: 'El Concurso de Murgas es una de las partes más importantes de nuestro Carnaval.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
