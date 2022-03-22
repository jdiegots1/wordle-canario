type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'vaina',
        definition: 'En femenino se emplea para referirse a una cosa o situación embarazosa o molesta y en masculino para referirse a una persona de poca formalidad y fundamento.',
        example: 'Lo que menos le gusta es la vaina de tener que estar con tanto papeleo.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
