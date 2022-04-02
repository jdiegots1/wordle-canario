type Definition = {
    word: string
    definition: string
    example: string
}

const DEFINITIONS: Definition[] = [
    {
        word: 'picon',
        definition: 'Puede ser lo dicho de ciertos condimentos, como la pimienta o la guindilla, y de las salsas que se hacen con ellos, que produce ardor en el paladar o arena volcánica.',
        example: 'A estas pimientas hay que quitarles la granilla porque, si no, el mojo sale muy picón.'
    },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
    WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
