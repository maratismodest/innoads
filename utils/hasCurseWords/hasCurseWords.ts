import { badPatterns, goodPatterns, goodWords, letters } from './hasCurseWords.constants';
import { curseWordsProps } from './types';

const curseWords: curseWordsProps = {
  badPatterns,
  goodPatterns,
  goodWords,
  letters,
  isInGoodWords: function (word: string) {
    for (let i = 0; i < this.goodWords.length; i++) {
      if (word == this.goodWords[i]) return true;
    }

    return false;
  },
  isInGoodPatterns: function (word: string) {
    for (let i = 0; i < this.goodPatterns.length; i++) {
      const pattern = new RegExp(this.goodPatterns[i]);
      if (pattern.test(word)) return true;
    }

    return false;
  },
  isInBadPatterns: function (word: string) {
    for (let i = 0; i < this.badPatterns.length; i++) {
      const pattern = new RegExp(this.badPatterns[i]);
      if (pattern.test(word)) return true;
    }

    return false;
  },
  addBadPattern: function (pattern: string) {
    this.badPatterns.push(pattern);
  },
  addGoodPattern: function (pattern: string) {
    this.goodPatterns.push(pattern);
  },
  addGoodWord: function (pattern: string) {
    this.goodWords.push(pattern);
  },
  convertEngToRus: function (word: string) {
    for (let j = 0; j < word.length; j++) {
      for (const key in this.letters) {
        if (word.charAt(j) == key)
          word = word.substring(0, j) + this.letters[key] + word.substring(j + 1, word.length);
      }
    }

    return word;
  },
  cleanBadSymbols: function (text: string) {
    return text.replace(/[^a-zA-Zа-яА-Яё0-9\s]/g, '');
  },
  containsMatInSpaceWords: function (words: string[]) {
    const spaceWords = this.findSpaceWords(words);

    for (let i = 0; i < spaceWords.length; i++) {
      const word = this.convertEngToRus(spaceWords[i]);

      if (this.isInBadPatterns(word)) return true;
    }

    return false;
  },
  //
  containsMat: function (aText: string) {
    const text = this.cleanBadSymbols(aText.toLowerCase());

    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
      const word = this.convertEngToRus(words[i]);

      if (this.isInGoodWords(word) && this.isInGoodPatterns(word)) continue;

      if (this.isInBadPatterns(word)) return true;
    }

    if (this.containsMatInSpaceWords(words)) return true;

    return false;
  },

  findSpaceWords: function (words: string[]) {
    const out: string[] = [];
    let spaceWord = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      if (word.length <= 3) {
        spaceWord += word;
        continue;
      }

      if (spaceWord.length >= 3) {
        out.push(spaceWord);
        spaceWord = '';
      }
    }

    return out;
  },
};

export function hasCurseWords(text: string = '') {
  return curseWords.containsMat(text);
}
