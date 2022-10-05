import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';
import { EnumDictionary } from './types';
import { Dn } from './dn-utils';

export type ResolveFunc<T> = (dn : Dn) => T;
export type ValueOrResolveFunc<T> = T | ResolveFunc<T>;

export class DiagramOrderDict
{
    private _order : EnumDictionary<NodeKind, number> = {};

    constructor()
    {
        // Logic Scope
        this.setOrder(NodeKind.initcont, 100);
        this.setOrder(NodeKind.cont, 110);

        this.setOrder(NodeKind.podtmpl, 150);

        this.setOrder(NodeKind.launcher, 200);
        this.setOrder(NodeKind.depl, 200);
        this.setOrder(NodeKind.ss, 200);
        this.setOrder(NodeKind.ds, 200);
        this.setOrder(NodeKind.replicaset, 200);
        this.setOrder(NodeKind.rc, 200);
        this.setOrder(NodeKind.job, 200);
        this.setOrder(NodeKind.cronjob, 200);
        
        this.setOrder(NodeKind.vols, 230);

        this.setOrder(NodeKind.hpa, 250);

        this.setOrder(NodeKind.svcaccnt, 270);

        this.setOrder(NodeKind.netpols, 280);
        
        this.setOrder(NodeKind.service, 300);
        this.setOrder(NodeKind.ingress, 320);


        // K8s Scope
        this.setOrder(NodeKind.version, 100);
        this.setOrder(NodeKind.api, 200);
    }

    protected setOrder(key: NodeKind, value: number)  : void
    {
        this._order[key] = value;
    }

    get(kind: NodeKind) : number
    {
        const value = this._order[kind];
        if (value) {
            return value;
        }

        return 500;
    }

}

export const DIAGRAM_ORDER = new DiagramOrderDict();