import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';
import { EnumDictionary } from './types';
import { Dn } from './dn-utils';

export type ResolveFunc<T> = (dn : Dn) => T;
export type ValueOrResolveFunc<T> = T | ResolveFunc<T>;
export class DiagramLabelsDict
{
    private _kindResolver : EnumDictionary<NodeKind, string> = {};

    constructor()
    {
        this.setKind(NodeKind.root, 'Root');

        /* K8s */
        this.setKind(NodeKind.k8s, 'K8s');
        this.setKind(NodeKind.cluster, 'Cluster');
        this.setKind(NodeKind.api, 'Api');
        this.setKind(NodeKind.version, 'Version');
        this.setKind(NodeKind.kind, 'Kind');
        this.setKind(NodeKind.resource, 'Resource');

        /* LOGIC */
        this.setKind(NodeKind.logic, 'Logic');
        this.setKind(NodeKind.ns, 'Namespace');
        this.setKind(NodeKind.app, 'Application');
        this.setKind(NodeKind.cont, 'Container');
        this.setKind(NodeKind.initcont, 'Init Container');
        this.setKind(NodeKind.vols, 'Volumes');
        this.setKind(NodeKind.vol, 'Volume');
        this.setKind(NodeKind.secret, 'Secret');
        this.setKind(NodeKind.configmap, 'Config Map');
        this.setKind(NodeKind.replicaset, 'Replica Set');
        this.setKind(NodeKind.hpa, 'Horizontal Pod AutoScaler');
        this.setKind(NodeKind.svcaccnt, 'Service Account');
        this.setKind(NodeKind.rlbndg, 'Role Binding');
        this.setKind(NodeKind.crlbndg, 'Cluster Role Binding');
        this.setKind(NodeKind.rl, 'Role');
        this.setKind(NodeKind.crl, 'Cluster Role');
        this.setKind(NodeKind.pv, 'Persistent Volume');
        this.setKind(NodeKind.pvc, 'Persistent Volume Claim');
        this.setKind(NodeKind.psp, 'Pod Security Policy');
        this.setKind(NodeKind.netpols, 'Network Policies');
        this.setKind(NodeKind.netpol, 'Network Policy');
        this.setKind(NodeKind.service, 'Service');
        this.setKind(NodeKind.pod, 'Pod');
        this.setKind(NodeKind.ingress, 'Ingress');
        this.setKind(NodeKind.launcher, 'Launcher');
        this.setKind(NodeKind.image, 'Image');

        /* INFRA */
        this.setKind(NodeKind.infra, 'Infra');
        this.setKind(NodeKind.nodes, 'Nodes');
        this.setKind(NodeKind.pool, 'Pool');
        this.setKind(NodeKind.node, 'Node');
        this.setKind(NodeKind.storage, 'Storage');
        this.setKind(NodeKind.storclass, 'Storage Class');

        /* IMAGES */
        this.setKind(NodeKind.images, 'Images');
        this.setKind(NodeKind.repo, 'Repo');
        this.setKind(NodeKind.tag, 'Tag');

        /* GATEWAY */
        this.setKind(NodeKind.gateway, 'Gateway');
        this.setKind(NodeKind.domain, 'Domain');
        this.setKind(NodeKind.url, 'URL');
    }

    protected setKind(key: NodeKind, value: string)  : void
    {
        this._kindResolver[key] = value;
    }


    get(kind: NodeKind)
    {
        const value = this._kindResolver[kind];
        if (value) {
            return value;
        }

        console.error("[DiagramLabels] Could not resolve value for: ", kind);
        // throw new Error("Could not resolve value for: " + kind);
        return kind.toString();
    }

}

export const DIAGRAM_LABELS = new DiagramLabelsDict();