type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'drago',
        definition: 'Árbol de la familia de las dracaenáceas, que puede alcanzar entre 12 y 14 metros de altura. La savia, llamada por su color rojizo sangre de drago, es usada en medicina y en la elaboración de tintes y barnices. Es una especie endémica de la región macaronésica.',
        example: ''
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
