import {FormValues} from "utils/constants";
import curseWords from "utils/antimat";

const hasCurseWords = ({title, body}: FormValues) => curseWords.containsMat(title) || curseWords.containsMat(body)
export default hasCurseWords
