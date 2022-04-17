type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'airon',
        definition: 'Podemos referirnos a la corriente de aire súbita que puede producir efectos perjudiciales para la salud o a la jaqueca o malestar causado por una corriente de aire.',
        example: 'Ella siempre decía que había que tener cuidado con las corriente porque podías coger un airón.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
