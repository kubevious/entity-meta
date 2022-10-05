import { NodeKind } from "./entities/node-kind";
import { NODE_LABELS } from "./node-labels";
export interface DiagramRoot {
    title: string,
    dn: string,
    kind: NodeKind,
    subNodes: NodeKind[]
}

export const TOP_ROOTS : DiagramRoot[] = [];

function addRoot(kind: NodeKind, dn: string)
{
    const label = NODE_LABELS.get(kind);
    if (!label) {
        throw new Error("Missing Label for " + kind);
    }

    const rootNode : DiagramRoot = {
        title: label,
        dn: dn,
        kind: kind,
        subNodes: []
    }

    TOP_ROOTS.push(rootNode);

    const builder = {
        subNode: (subNodeKind: NodeKind) => {
            rootNode.subNodes.push(subNodeKind);
            return builder;
        }
    };

    return builder;
}

addRoot(NodeKind.logic, 'root/logic')
    .subNode(NodeKind.ns)
    .subNode(NodeKind.app)
    .subNode(NodeKind.cont)
    .subNode(NodeKind.initcont)
    .subNode(NodeKind.vols)
    .subNode(NodeKind.vol)
    .subNode(NodeKind.mounts)
    .subNode(NodeKind.mount)
    .subNode(NodeKind.secret)
    .subNode(NodeKind.configmap)
    .subNode(NodeKind.hpa)
    .subNode(NodeKind.svcaccnt)
    .subNode(NodeKind.rlbndg)
    .subNode(NodeKind.crlbndg)
    .subNode(NodeKind.rl)
    .subNode(NodeKind.crl)
    .subNode(NodeKind.pv)
    .subNode(NodeKind.pvc)
    .subNode(NodeKind.psp)
    .subNode(NodeKind.netpols)
    .subNode(NodeKind.netpol)
    .subNode(NodeKind.service)
    .subNode(NodeKind.ingress)
    .subNode(NodeKind.image)
    .subNode(NodeKind.port)

    .subNode(NodeKind.depl)
    .subNode(NodeKind.ss)
    .subNode(NodeKind.ds)
    .subNode(NodeKind.replicaset)
    .subNode(NodeKind.job)
    .subNode(NodeKind.cronjob)
    .subNode(NodeKind.pod)

    ;

addRoot(NodeKind.images, 'root/images')
    .subNode(NodeKind.repo)
    .subNode(NodeKind.image)
    .subNode(NodeKind.tag)
    .subNode(NodeKind.ns)
    .subNode(NodeKind.app)
    ;

addRoot(NodeKind.gateway, 'root/gateway')
    .subNode(NodeKind.domain)
    .subNode(NodeKind.url)
    .subNode(NodeKind.ingress)
    .subNode(NodeKind.service)
    .subNode(NodeKind.port)
    .subNode(NodeKind.app)
    .subNode(NodeKind.traefik_ingress_route)
    .subNode(NodeKind.traefik_service)
    .subNode(NodeKind.traefik_middleware)
    .subNode(NodeKind.traefik_tls_opts)
    ;

addRoot(NodeKind.pack, 'root/pack')
    .subNode(NodeKind.ns)
    .subNode(NodeKind.helm)
    .subNode(NodeKind.version)
    ;

addRoot(NodeKind.k8s, 'root/k8s')
    .subNode(NodeKind.cluster)
    .subNode(NodeKind.ns)
    .subNode(NodeKind.api)
    .subNode(NodeKind.version)
    .subNode(NodeKind.kind)
    .subNode(NodeKind.resource)
    ;

addRoot(NodeKind.infra, 'root/infra')
    .subNode(NodeKind.nodes)
    .subNode(NodeKind.pool)
    .subNode(NodeKind.node)
    .subNode(NodeKind.storage)
    .subNode(NodeKind.storclass)
    .subNode(NodeKind.pv)
    .subNode(NodeKind.k8s)
    .subNode(NodeKind.api)
    .subNode(NodeKind.version)
    .subNode(NodeKind.kind)
    .subNode(NodeKind.ns)
    ;


addRoot(NodeKind.rbac, 'root/rbac')
    .subNode(NodeKind.user)
    .subNode(NodeKind.group)
    ;