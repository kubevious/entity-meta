export function camelToHyphenSnake(str : string) : string
{
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}