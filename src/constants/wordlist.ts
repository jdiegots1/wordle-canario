type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'sacho',
        definition: 'Instrumento que consiste en una lámina de hierro en forma de media luna, con un cabo largo que encaja en un anillo situado bajo el borde de la parte superior del lado curvo, que se emplea para cavar la tierra.',
        example: 'Tuvo que comprar otro sacho porque ese ya tenía las puntas romas.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
