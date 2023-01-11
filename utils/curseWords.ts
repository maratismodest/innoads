import { FormValues } from './constants'

const badPatterns = [
    '^(о|а)н(о|а)нист.*',
    '^лошар.*',
    '^к(а|о)злина$',
    '^к(о|а)зел$',
    '^сволоч(ь|ъ|и|уга|ам|ами).*',
    '^лох[уеыаоэяию].*',
    '.*урод(ы|у|ам|ина|ины).*',
    '.*бля(т|д).*', '.*гандо.*',
    '^м(а|о)нд(а|о).*',
    '.*сперма.*',
    '.*[уеыаоэяию]еб$',
    '^сучк(а|у|и|е|ой|ай).*',
    '^придур(ок|ки).*',
    '^д(е|и)би(л|лы).*',
    '^сос(ать|и|ешь|у)$',
    '^залуп.*',
    '^муд(е|ил|о|а|я|еб).*',
    '.*шалав(а|ы|ам|е|ами).*',
    '.*пр(а|о)ст(и|е)т(у|е)тк(а|и|ам|е|ами).*',
    '.*шлюх(а|и|ам|е|ами).*',
    '.*ху(й|и|я|е|л(и|е)).*',
    '.*п(и|е|ы)зд.*',
    '^бл(я|т|д).*',
    '(с|сц)ук(а|о|и|у).*',
    '^еб.*',
    '.*(д(о|а)лб(о|а)|разъ|разь|за|вы|по)ебы*.*',
    '.*пид(а|о|е)р.*',
    '.*хер.*',
    '^жоп(а|ы|ой|ами).*',
]

const goodPatterns = [
    '.*психу.*',
    '.*к(о|а)манд.*',
    '.*истр(е|и)блять.*',
    '.*л(о|а)х(о|а)трон.*',
    '.*(о|а)ск(о|а)рблять.*',
    'хул(е|и)ган',
    '.*м(а|о)нд(а|о)рин.*',
    '.*р(а|о)ссл(а|о)блять.*',
    '.*п(о|а)тр(е|и)блять.*',
    '.*@.*\\.(ру|сом|нет)$',
]

const goodWords = [
    'дезмонда',
    'застрахуйте',
    'одномандатный',
    'подстрахуй',
    'психуй',
]

const letters: Record<string, string> = {
    'a': 'а',
    'b': 'в',
    'c': 'с',
    'e': 'е',
    'f': 'ф',
    'g': 'д',
    'h': 'н',
    'i': 'и',
    'k': 'к',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'р',
    'r': 'р',
    's': 'с',
    't': 'т',
    'u': 'у',
    'v': 'в',
    'x': 'х',
    'y': 'у',
    'w': 'ш',
    'z': 'з',
    'ё': 'е',
    '6': 'б',
    '9': 'д',
}

interface curseWordsProps {
    badPatterns: string[],
    goodPatterns: string[],
    goodWords: string[],
    letters: Record<string, string>,
    containsMat: (x: string) => boolean
    cleanBadSymbols: any,
    convertEngToRus: any,
    isInGoodWords: any,
    isInGoodPatterns: any,
    isInBadPatterns: any,
    containsMatInSpaceWords: any,
    findSpaceWords: any,
    addBadPattern: any,
    addGoodPattern: any,
    addGoodWord: any
}

const curseWords: curseWordsProps = {
    badPatterns,
    goodPatterns,
    goodWords,
    letters,
    containsMat: function(aText: string) {

        const text = this.cleanBadSymbols(aText.toLowerCase())

        const words = text.split(' ')

        for (let i = 0; i < words.length; i++) {

            const word = this.convertEngToRus(words[i])

            if (this.isInGoodWords(word) && this.isInGoodPatterns(word))
                continue

            if (this.isInBadPatterns(word))
                return true
        }

        if (this.containsMatInSpaceWords(words))
            return true

        return false
    },
    convertEngToRus: function(word: string) {
        for (let j = 0; j < word.length; j++) {
            for (const key in this.letters) {
                if (word.charAt(j) == key)
                    word = word.substring(0, j) + this.letters[key] + word.substring(j + 1, word.length)
            }
        }

        return word
    },
    cleanBadSymbols: function(text: string) {
        return text.replace(/[^a-zA-Zа-яА-Яё0-9\s]/g, '')
    },
    isInGoodWords: function(word: string) {

        for (let i = 0; i < this.goodWords.length; i++) {
            if (word == this.goodWords[i])
                return true
        }

        return false
    },
    isInGoodPatterns: function(word: string) {

        for (let i = 0; i < this.goodPatterns.length; i++) {
            const pattern = new RegExp(this.goodPatterns[i])
            if (pattern.test(word))
                return true
        }

        return false
    },
    isInBadPatterns: function(word: string) {

        for (let i = 0; i < this.badPatterns.length; i++) {
            const pattern = new RegExp(this.badPatterns[i])
            if (pattern.test(word))
                return true
        }

        return false
    },
    containsMatInSpaceWords: function(words: string) {
        const spaceWords = this.findSpaceWords(words)

        for (let i = 0; i < spaceWords.length; i++) {

            const word = this.convertEngToRus(spaceWords[i])

            if (this.isInBadPatterns(word))
                return true
        }

        return false
    },
    findSpaceWords: function(words: string) {

        const out = []
        let spaceWord = ''

        for (let i = 0; i < words.length; i++) {
            const word = words[i]

            if (word.length <= 3) {
                spaceWord += word
                continue
            }

            if (spaceWord.length >= 3) {
                out.push(spaceWord)
                spaceWord = ''
            }
        }

        return out
    },
    addBadPattern: function(pattern: string) {
        this.badPatterns.push(pattern)
    },

    addGoodPattern: function(pattern: string) {
        this.goodPatterns.push(pattern)
    },
    addGoodWord: function(pattern: string) {
        this.goodWords.push(pattern)
    },
}

const hasCurseWords = ({ title, body }: FormValues) => curseWords.containsMat(title) || curseWords.containsMat(body)
export default hasCurseWords
