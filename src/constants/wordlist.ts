type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'breva',
        definition: 'Podemos referirnos a una persona que llora mucho y con facilidad o a una variedad de higo alargado, de cáscara fina, color canelo negruzco y pulpa blanda y suave..',
        example: 'No le puedes decir nada, porque es un breva.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
