import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';
import { NODE_LABELS } from './node-labels';
import { NODE_KINDS } from './node-kinds';

export class DiagramLabelToKindDict
{
    private _dict : Record<string, NodeKind> = {};

    constructor()
    {
        for(const kind of NODE_KINDS)
        {
            const label = NODE_LABELS.get(kind);
            this._dict[kind] = kind;
            this._dict[label] = kind;
        }
    }


    get(label: string) : NodeKind
    {
        const kind = this._dict[label];
        if (kind) {
            return kind;
        }

        throw new Error("Could not resolve node kind label: " + label);
    }

}

export const NODE_LABEL_TO_KIND = new DiagramLabelToKindDict();