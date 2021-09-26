import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';
import { EnumDictionary } from './types';
import * as DnUtils from './dn-utils';
import { RnInfo } from './dn-utils';

export type ResolveFunc<T> = (dnParts : RnInfo[]) => T;
export type ValueOrResolveFunc<T> = T | ResolveFunc<T>;

export class DiagramDict<T>
{
    private _kindResolver : EnumDictionary<NodeKind, T> = {};
    private _pathResolver : Record<string, ValueOrResolveFunc<T>> = {};

    constructor()
    {
        // this.setKind(NodeKind.hpa, 'Horizontal Pod AutoScaler')

        // this.setPath([NodeKind.root,
        //               NodeKind.k8s,
        //               NodeKind.api,
        //               NodeKind.version,
        //               NodeKind.version,
        //               NodeKind.kind],
        //              (dnParts) => {
        //                 return 'Horizontal Pod AutoScaler';
        //              })
    }

    private setKind(key: NodeKind, value: T)
    {
        this._kindResolver[key] = value;
    }

    private setPath(path: NodeKind[], value: ValueOrResolveFunc<T>)
    {
        const names = path.map(x => x.toString());
        const key = names.join('-');
        this._pathResolver[key] = value;
    }

    get(dn: string)
    {
        const dnParts = DnUtils.parseDn(dn);
        const kind = _.last(dnParts).kind;

        {
            const defaultValue = this._kindResolver[kind];
            if (defaultValue) {
                return defaultValue;
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
                    return (<ResolveFunc<T>>value)(dnParts);
                }
            }
        }

        throw new Error("Could not resolve value for: " + dn);
    }

}