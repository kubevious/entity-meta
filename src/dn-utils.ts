import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';

export interface RnInfo {
    kind: NodeKind,
    name?: string | null
}

export type Dn = RnInfo[];

export function splitDn(dn : string) : string[]
{
    const parts : string[] = [];

    let ch = null;
    let token = "";
    let parsingKind = true;
    let parsingNaming = true;
    for (let i = 0; i < dn.length; i++) {
        let skipAdd = false;
        ch = dn.charAt(i);
        if (parsingKind) {
            if (ch == '-') {
                parsingKind = false;
            } else if (ch == '/') {
                skipAdd = true;
                parts.push(token);
                token = "";
            }
        } else {
            if (parsingNaming) {
                if (ch == ']') {
                    parsingNaming = false;
                }
            } else {
                if (ch == '[') {
                    parsingNaming = true;
                } else if (ch == '/') {
                    skipAdd = true;
                    parts.push(token);
                    token = "";
                }
            }
        }

        if (!skipAdd) {
            token += ch;
        }
    }

    if (token.length > 0) {
        parts.push(token);
    }

    return parts;
}

export function parseRn(rn: string) : RnInfo
{
    const index = rn.indexOf('-');
    if (index == -1) {
        return {
            kind: parseKind(rn),
            name: null
        };
    }
    return {
        kind: parseKind(rn.substr(0, index)),
        name: rn.substr(index + 2, rn.length - (index + 3))
    };
}

function parseKind(kind: string) : NodeKind
{
    return <NodeKind>kind;
}

export function parseDn(dn : string) : Dn
{
    const parts = splitDn(dn);
    return parts.map(x => parseRn(x));
}

export function parentDn(dn : string) : string
{
    const parts = splitDn(dn);
    return makeDnFromParts(_.dropRight(parts));
}

function makeRn(infoOrKind : RnInfo | string) : string
{
    if (_.isString(infoOrKind)) {
        return infoOrKind;
    }
    if (infoOrKind.name) {
        return `${infoOrKind.kind}-[${infoOrKind.name}]`
    }
    return infoOrKind.kind;
}

export function makeDn(parts: RnInfo[]) : string
{
    return makeDnFromParts(parts.map(x => makeRn(x)));
}

function makeDnFromParts(parts: string[]) : string
{
    return parts.join('/');
}