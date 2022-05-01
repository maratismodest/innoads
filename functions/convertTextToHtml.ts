export const convertTextToHtml = (text: string) => {
    return text.replace(/(\r\n|\n|\r)/gm, "%0A");
}
