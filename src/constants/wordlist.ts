type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'meneo',
        definition: 'Ajetreo, trajón, gran actividad comercial.',
        example: 'Ahora en Navidades hay mucho meneo en la zona de las tiendas.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
