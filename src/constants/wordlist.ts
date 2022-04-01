type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'sargo',
        definition: 'Persona astuta, taimada',
        example: 'Ten cuidado con esos gangocheros, que son unos sargos y te meten gato por liebre.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
