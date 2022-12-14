const badWords = [
    'хуй',
    'жопа',
    'украина',
    'пизда'
]

const filterBadwords = (sString: string): boolean => {
    const lowerCase = sString.toLowerCase()
    for (let i = 0; i < badWords.length; i++) {
        if (lowerCase.includes(badWords[i])) {
            return true
        }
    }
    return false
}
export default filterBadwords
