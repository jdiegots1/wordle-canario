type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'añero',
        definition: 'Dicho de una planta, que en un año da mucho fruto y poco o ninguno en otro.',
        example: 'Aquí en esta finca hay muchos árboles que son añero: ese duraznero el año pasado no dio ni un durazno, y este año míralo cómo viene cargadito.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
