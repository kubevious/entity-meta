import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';
import { EnumDictionary } from './types';
import * as DnUtils from './dn-utils';
import { Dn } from './dn-utils';

export type ResolveFunc<T> = (dnParts : Dn) => T;
export type ValueOrResolveFunc<T> = T | ResolveFunc<T>;

export class NodeDict<T>
{
    private _kindResolver : EnumDictionary<NodeKind, ValueOrResolveFunc<T>> = {};
    private _pathResolver : Record<string, ValueOrResolveFunc<T>> = {};

    protected setKind(key: NodeKind, value: ValueOrResolveFunc<T>)  : void
    {
        this._kindResolver[key] = value;
    }

    protected setPath(path: NodeKind[], value: ValueOrResolveFunc<T>) : void
    {
        const names = path.map(x => x.toString());
        const key = names.join('-');
        this._pathResolver[key] = value;
    }

    get(dnOrParts: string | Dn)
    {
        let dnParts : Dn;
        if (_.isString(dnOrParts)) {
            dnParts = DnUtils.parseDn(dnOrParts);
        } else {
            dnParts = dnOrParts;
        }

        const lastPart = _.last(dnParts);
        if (!lastPart) {
            console.error("[DiagramDict] invalid dn provided.");
            // throw new Error("Invalid dn: " + dnOrParts);
            return this._getDefaultValue([]);
        }
        const kind = lastPart.kind;
        
        {
            const value = this._kindResolver[kind];
            if (value) {
                if (_.isString(value)) {
                    return value;
                } else {
                    const value2 = (<ResolveFunc<T>>value)(dnParts);
                    if (value2) {
                        return value2;
                    }
                    return this._getDefaultValue(dnParts);
                }
            }
        }

        {
            const names = dnParts.map(x => x.kind);
            const key = names.join('-');
            const value = this._pathResolver[key];
            if (value) {
                if (_.isString(value)) {
                    return value;
                } else {
                    const value2 = (<ResolveFunc<T>>value)(dnParts);
                    if (value2) {
                        return value2;
                    }
                    return this._getDefaultValue(dnParts);
                }
            }
        }

        console.error("[DiagramDict] Could not resolve value for: ", dnOrParts);
        return this._getDefaultValue(dnParts);
    }

    protected _getDefaultValue(dn?: Dn)
    {
        throw new Error("Could not resolve value for: " + dn);
    }

}