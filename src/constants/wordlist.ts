type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'arepa',
        definition: 'La palabra "arepa" está incluída en el Diccionario Básico de Canarismos de la Academia Canaria de la Lengua. Especie de torta de forma circular, hecha con millo ablandado a fuego lento y luego molido, o con harina de millo precocida, cocinada sobre una plancha o frita. ',
        example: 'Las arepas se empezaron a comer aquí por la gente que venía de Venezuela.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
