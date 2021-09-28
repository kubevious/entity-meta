import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';

export interface RnInfo {
    rn: string,
    kind: NodeKind,
    name: string | null
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
            rn: rn,
            kind: getKind(rn),
            name: null
        };
    }
    return {
        rn: rn,
        kind: getKind(rn.substr(0, index)),
        name: rn.substr(index + 2, rn.length - (index + 3))
    };
}

export function getKind(kind: string) : NodeKind
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

export function makeDn(parentDn: string, childRn: string) : string
{
    if (!parentDn) {
        return childRn;
    }
    return parentDn + "/" + childRn;
}

export function makeDnFromParts(parts: string[]) : string
{
    return parts.join('/');
}