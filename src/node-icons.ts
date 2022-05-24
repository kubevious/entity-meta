import _ from 'the-lodash';
import { NodeDict } from './node-dict';
import { Dn } from './dn-utils';
import { NodeKind } from './entities/node-kind';

type KindIconDict = { [kind: string] : string};
type ApiIconDict = { [api: string] : KindIconDict};

export class NodeIconsDict extends NodeDict<string | null>
{
    private _apiServiceDict : KindIconDict = {};

    private _k8sClusteredCoreDict : KindIconDict = {};
    private _k8sClusteredApiDict : ApiIconDict = {};
    private _k8sNamespacedCoreDict : KindIconDict = {};
    private _k8sNamespacedApiDict : ApiIconDict = {};

    private _k8sUnknownIcon: string;

    constructor()
    {
        super();

        this._k8sUnknownIcon = this._k8sIconPath('unknown.svg');

        this._setupK8s();
        this._setupLogic();
        this._setupInfra();
        this._setupImages();
        this._setupGateway();
        this._setupPackage();
        this._setupRBAC();

        this._setup3rdParty();
    }

    private _setupK8s()
    {
        this.setKind(NodeKind.cluster, this._iconPath('api-cluster.svg'));
        this.setKind(NodeKind.api, this._handleApi.bind(this));
        this.setKind(NodeKind.version, this._iconPath('api-version.svg'));

        /*** INITIAL SETUP ***/
        /* K8s :: Cluster :: Core */
        this._setK8sClusteredCore('Namespace', 'ns.svg');
        this._setK8sClusteredCore('Node', 'node.svg');
        this._setK8sClusteredCore('PersistentVolume', 'pv.svg');

        /* K8s :: Cluster :: RBAC */
        this._setK8sClusteredApi('rbac.authorization.k8s.io', 'ClusterRoleBinding', 'crb.svg');
        this._setK8sClusteredApi('rbac.authorization.k8s.io', 'ClusterRole', 'c-role.svg');

        /* K8s :: Cluster :: Policy */
        this._setK8sClusteredApi('policy', 'PodSecurityPolicy', 'psp.svg');

        /* K8s :: Namespace :: Core */
        this._setK8sNamespacedCore('ConfigMap', 'cm.svg');
        this._setK8sNamespacedCore('Pod', 'pod.svg');
        this._setK8sNamespacedCore('ServiceAccount', 'sa.svg');
        this._setK8sNamespacedCore('Service', 'svc.svg');
        this._setK8sNamespacedCore('PersistentVolumeClaim', 'pvc.svg');
        this._setK8sNamespacedCore('Secret', 'secret.svg');
        this._setK8sNamespacedCore('LimitRange', 'limits.svg');
        this._setK8sNamespacedCore('ResourceQuota', 'quota.svg');
        this._setK8sNamespacedCore('Endpoints', 'ep.svg');
        this._setK8sNamespacedCore('Event', 'event.svg');
        
        /* K8s :: Namespace :: App */
        this._setK8sNamespacedApi('apps', 'Deployment', 'deploy.svg');
        this._setK8sNamespacedApi('apps', 'DaemonSet', 'ds.svg');
        this._setK8sNamespacedApi('apps', 'StatefulSet', 'sts.svg');
        this._setK8sNamespacedApi('apps', 'ReplicaSet', 'rs.svg');

        /* K8s :: Namespace :: batch */
        this._setK8sNamespacedApi('batch', 'Job', 'job.svg');
        this._setK8sNamespacedApi('batch', 'CronJob', 'cronjob.svg');

        /* K8s :: Namespace :: autoscaling */
        this._setK8sNamespacedApi('autoscaling', 'HorizontalPodAutoscaler', 'hpa.svg');

        /* K8s :: Namespace :: extensions */
        this._setK8sNamespacedApi('extensions', 'Ingress', 'ing.svg');

        /* K8s :: Namespace :: RBAC */
        this._setK8sNamespacedApi('rbac.authorization.k8s.io', 'RoleBinding', 'rb.svg');
        this._setK8sNamespacedApi('rbac.authorization.k8s.io', 'Role', 'role.svg');

        /* K8s :: Namespace :: Networking */
        this._setK8sNamespacedApi('networking.k8s.io', 'NetworkPolicy', 'netpol.svg');
        this._setK8sNamespacedApi('networking.k8s.io', 'Ingress', 'ing.svg');
        this._setK8sNamespacedApi('networking.k8s.io', 'IngressClass', 'ing.svg');

        /* K8s :: Namespace :: Discovery */
        this._setK8sNamespacedApi('discovery.k8s.io', 'EndpointSlice', 'ep.svg');

        /* K8s :: Namespace :: Storage */
        this._setK8sNamespacedApi('storage.k8s.io', 'VolumeAttachment', 'vol.svg');

        /*** *** *** *** ***/

        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.cluster, NodeKind.version, NodeKind.kind],
                     this._handleK8sClusteredCore.bind(this));
        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.cluster, NodeKind.version, NodeKind.kind, NodeKind.resource],
                     this._handleK8sClusteredCore.bind(this));
  
        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.cluster, NodeKind.api, NodeKind.version, NodeKind.kind], 
                     this._handleK8sClusteredApi.bind(this));
        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.cluster, NodeKind.api, NodeKind.version, NodeKind.kind, NodeKind.resource], 
                     this._handleK8sClusteredApi.bind(this));

        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.ns, NodeKind.version, NodeKind.kind], 
                     this._handleK8sNamespacedCore.bind(this));
        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.ns, NodeKind.version, NodeKind.kind, NodeKind.resource], 
                     this._handleK8sNamespacedCore.bind(this));
   
        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.ns, NodeKind.api, NodeKind.version, NodeKind.kind], 
                     this._handleK8sNamespacedApi.bind(this));
        this.setPath([NodeKind.root, NodeKind.k8s, NodeKind.ns, NodeKind.api, NodeKind.version, NodeKind.kind, NodeKind.resource], 
                     this._handleK8sNamespacedApi.bind(this));
            

        // Unused Icons:
        // - crd.svg
        // - group.svg
        // - sc.svg
        // - user.svg
    }

    private _handleApi(dnParts : Dn)
    {
        const api = _.last(dnParts)!;
        if (api.name) {
            const icon = this._apiServiceDict[api.name];
            if (icon) {
                return icon;
            }
        }

        return this._k8sIconPath('api.svg');
    }

    private _handleK8sClusteredCore(dnParts: Dn)
    {
        const kind = dnParts[4].name!;
        return this._k8sClusteredCoreDict[kind] ?? this._k8sUnknownIcon;
    }

    private _handleK8sClusteredApi(dnParts: Dn)
    {
        const api = dnParts[3].name!;
        const kind = dnParts[5].name!;
        const apiDict = this._k8sClusteredApiDict[api];
        if (!apiDict) {
            return this._k8sUnknownIcon;
        }
        return apiDict[kind] ?? this._k8sUnknownIcon;
    }

    private _handleK8sNamespacedCore(dnParts: Dn)
    {
        const kind = dnParts[4].name!;
        return this._k8sNamespacedCoreDict[kind] ?? this._k8sUnknownIcon;
    }

    private _handleK8sNamespacedApi(dnParts: Dn)
    {
        const api = dnParts[3].name!;
        const kind = dnParts[5].name!;
        const apiDict = this._k8sNamespacedApiDict[api];
        if (!apiDict) {
            return this._k8sUnknownIcon;
        }
        return apiDict[kind] ?? this._k8sUnknownIcon;
    }

    private _setupInfra()
    {
        this.setKind(NodeKind.k8s, this._k8sIconPath('api.svg'));
        this.setKind(NodeKind.infra, this._iconPath('infra/infra.svg'));
        this.setKind(NodeKind.nodes, this._iconPath('infra/nodes.svg'));
        this.setKind(NodeKind.pool, this._iconPath('infra/pool.svg'));
        this.setKind(NodeKind.node, this._k8sIconPath('node.svg'));
        this.setKind(NodeKind.storage, this._iconPath('infra/storage.svg'));
        this.setKind(NodeKind.storclass, this._iconPath('infra/storclass.svg'));

        this.setPath([NodeKind.root, NodeKind.infra, NodeKind.k8s, NodeKind.api, NodeKind.version, NodeKind.kind],
            (dnParts) =>
            {
                const api = dnParts[3].name!;
                const kind = dnParts[5].name!;

                {
                    const apiDict = this._k8sClusteredApiDict[api];
                    if (apiDict) {
                        const value = apiDict[kind];
                        if (value) {
                            return value;
                        }
                    }
                }

                {
                    const apiDict = this._k8sNamespacedApiDict[api];
                    if (apiDict) {
                        const value = apiDict[kind];
                        if (value) {
                            return value;
                        }
                    }
                }

                return this._k8sUnknownIcon;
            });

        this.setPath([NodeKind.root, NodeKind.infra, NodeKind.k8s, NodeKind.version, NodeKind.kind],
            (dnParts) =>
            {
                const kind = dnParts[4].name!;

                {
                    const value = this._k8sClusteredCoreDict[kind];
                    if (value) {
                        return value;
                    }
                }

                {
                    const value = this._k8sNamespacedCoreDict[kind];
                    if (value) {
                        return value;
                    }

                }

                return this._k8sUnknownIcon;
            });
    }
    
    private _setupLogic()
    {
        this.setKind(NodeKind.logic, this._iconPath('logic/logic.svg'));
        this.setKind(NodeKind.app, this._iconPath('logic/app.svg'));
        this.setKind(NodeKind.cont, this._iconPath('logic/cont.svg'));
        this.setKind(NodeKind.initcont, this._iconPath('logic/initcont.svg'));
        this.setKind(NodeKind.port, this._iconPath('logic/port.svg'));
        this.setKind(NodeKind.image, this._iconPath('logic/image.svg'));
        this.setKind(NodeKind.vols, this._k8sIconPath('vol.svg'));
        this.setKind(NodeKind.vol, this._k8sIconPath('vol.svg'));
        this.setKind(NodeKind.mounts, this._iconPath('logic/mounts.png'));
        this.setKind(NodeKind.mount, this._iconPath('logic/mount.png'));

        this.setKind(NodeKind.ns, this._k8sIconPath('ns.svg'));
        this.setKind(NodeKind.secret, this._k8sIconPath('secret.svg'));
        this.setKind(NodeKind.configmap, this._k8sIconPath('cm.svg'));
        this.setKind(NodeKind.replicaset, this._k8sIconPath('rs.svg'));
        this.setKind(NodeKind.hpa, this._k8sIconPath('hpa.svg'));
        this.setKind(NodeKind.svcaccnt, this._k8sIconPath('sa.svg'));
        this.setKind(NodeKind.rlbndg, this._k8sIconPath('rb.svg'));
        this.setKind(NodeKind.crlbndg, this._k8sIconPath('crb.svg'));
        this.setKind(NodeKind.rl, this._k8sIconPath('role.svg'));
        this.setKind(NodeKind.crl, this._k8sIconPath('c-role.svg'));
        this.setKind(NodeKind.pv, this._k8sIconPath('pv.svg'));
        this.setKind(NodeKind.pvc, this._k8sIconPath('pvc.svg'));
        this.setKind(NodeKind.psp, this._k8sIconPath('psp.svg'));
        this.setKind(NodeKind.netpols, this._k8sIconPath('netpol.svg'));
        this.setKind(NodeKind.netpol, this._k8sIconPath('netpol.svg'));
        this.setKind(NodeKind.service, this._k8sIconPath('svc.svg'));
        this.setKind(NodeKind.ingress, this._k8sIconPath('ing.svg'));
        this.setKind(NodeKind.pod, this._k8sIconPath('pod.svg'));
        this.setKind(NodeKind.job, this._k8sIconPath('job.svg'));
        this.setKind(NodeKind.cronjob, this._k8sIconPath('cronjob.svg'));

        this.setKind(NodeKind.launcher,
            (dnParts) => {
                const kind = _.last(dnParts)!.name!;
                switch(kind) {
                    case 'Deployment': return this._k8sIconPath('deploy.svg');
                    case 'DaemonSet': return this._k8sIconPath('ds.svg');
                    case 'StatefulSet': return this._k8sIconPath('sts.svg');
                    case 'Job': return this._k8sIconPath('job.svg');
                    case 'CronJob': return this._k8sIconPath('cronjob.svg');
                    case 'ReplicaSet': return this._k8sIconPath('rs.svg');
                    case 'Pod': return this._k8sIconPath('pod.svg');
                }
                return this._iconPath('logic/launcher.svg');
            });
    }
    
    private _setupImages()
    {
        this.setKind(NodeKind.images, this._iconPath('images/images.svg'));
        this.setKind(NodeKind.repo, this._iconPath('images/repository.svg'));
        this.setKind(NodeKind.tag, this._iconPath('images/tag.svg'));
    }

    private _setupGateway()
    {
        this.setKind(NodeKind.gateway, this._iconPath('gateway/gateway.png'));
        this.setKind(NodeKind.domain, this._iconPath('gateway/domain.png'));
        this.setKind(NodeKind.url, this._iconPath('gateway/url.png'));
    }
    
    private _setupPackage()
    {
        this.setKind(NodeKind.pack, this._iconPath('pack/pack.png'));
        this.setKind(NodeKind.helm, this._iconPath('pack/helm.svg'));
    }

    private _setupRBAC()
    {
        this.setKind(NodeKind.rbac, this._iconPath('rbac/rbac.svg'));
        this.setKind(NodeKind.user, this._iconPath('rbac/user.svg'));
        this.setKind(NodeKind.group, this._iconPath('rbac/group.svg'));
    }
    
    private _setup3rdParty()
    {
        this._setupTraefik()
    }

    private _setupTraefik()
    {
        {
            const icon = this._iconPath('3rdparty/traefik/traefik.svg');
            this._apiServiceDict['traefik.containo.us'] = icon;
        }

        {
            const icon = this._iconPath('3rdparty/traefik/traefik-ingress-route.svg');
            this._setNamespacedApi('traefik.containo.us', 'IngressRoute', icon);
            this.setKind(NodeKind.traefik_ingress_route, icon);
        }

        {
            const icon = this._iconPath('3rdparty/traefik/traefik-service.svg');
            this._setNamespacedApi('traefik.containo.us', 'TraefikService', icon);
            this.setKind(NodeKind.traefik_service, icon);
        }

        {
            const icon = this._iconPath('3rdparty/traefik/traefik-middleware.svg')
            this._setNamespacedApi('traefik.containo.us', 'Middleware', icon);
            this.setKind(NodeKind.traefik_middleware, icon);
        }

        {
            const icon = this._iconPath('3rdparty/traefik/traefik-tls-options.svg')
            this._setNamespacedApi('traefik.containo.us', 'TLSOption', icon);
            this.setKind(NodeKind.traefik_tls_opts, icon);
        }
    }

    //

    private _setK8sClusteredCore(kind: string, icon: string) : void
    {
        this._k8sClusteredCoreDict[kind] = this._k8sIconPath(icon);
    }

    private _setK8sClusteredApi(api: string, kind: string, icon: string) : void
    {
        if (!this._k8sClusteredApiDict[api]) {
            this._k8sClusteredApiDict[api] = {}
        }
        this._k8sClusteredApiDict[api][kind] = this._k8sIconPath(icon);
    }

    private _setK8sNamespacedCore(kind: string, icon: string) : void
    {
        this._k8sNamespacedCoreDict[kind] = this._k8sIconPath(icon);
    }

    private _setK8sNamespacedApi(api: string, kind: string, icon: string) : void
    {
        this._setNamespacedApi(api, kind, this._k8sIconPath(icon));
    }

    private _setNamespacedApi(api: string, kind: string, iconPath: string) : void
    {
        if (!this._k8sNamespacedApiDict[api]) {
            this._k8sNamespacedApiDict[api] = {}
        }
        this._k8sNamespacedApiDict[api][kind] = iconPath;
    }

    private _k8sIconPath(x: string)
    {
        return this._iconPath(`k8s/${x}`);
    }

    private _iconPath(x: string)
    {
        return `/img/entities/${x}`;
    }

    protected _getDefaultValue(dn?: Dn)
    {
        return this._iconPath('unknown.svg');
    }
}

export const NODE_ICONS = new NodeIconsDict();