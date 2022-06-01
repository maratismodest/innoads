export const convertTextToHtml = (text: string): string => text.replace(/(\r\n|\n|\r)/gm, "%0A");

