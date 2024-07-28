type StringToBoolean = (text: string) => boolean;
type StringToVoid = (text: string) => void;
type StringToString = (text: string) => string;

export interface curseWordsProps {
  containsMat: StringToBoolean;
  isInGoodWords: StringToBoolean;
  isInGoodPatterns: StringToBoolean;
  isInBadPatterns: StringToBoolean;
  addBadPattern: StringToVoid;
  addGoodPattern: StringToVoid;
  addGoodWord: StringToVoid;
  convertEngToRus: StringToString;
  cleanBadSymbols: StringToString;
  badPatterns: string[];
  goodPatterns: string[];
  goodWords: string[];
  letters: Record<string, string>;
  containsMatInSpaceWords: (words: string[]) => boolean;
  findSpaceWords: (words: string[]) => string[];
}
