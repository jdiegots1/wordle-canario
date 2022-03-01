type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'lucha',
        definition: 'deporte tradicional de las Islas, consistente en un enfrentamiento entre dos rivales en el que procura cada uno de ellos vencer al otro tumbándolo o haciendo que toque el suelo con alguna parte del cuerpo distinta de las plantas de los pies. También se puede emplear la frase “no cojas lucha”, que significa que no te preocupes tanto, que hay que tomarse las cosas con calma y no ofuscarse con los problemas',
        example: 'No cojas lucha, yo tampoco me sabía la palabra del Wordle canario de hoy.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
