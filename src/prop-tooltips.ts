import { PropsKind } from './entities/props-kind';
import { NodeKind } from './entities/node-kind';
import { EnumDictionary } from './types';

export type PropsTooltipValue = string | PropsComplexTooltipValue;

export type PropsComplexTooltipValue = {
    owner: EnumDictionary<NodeKind, string>,
    default: string
}

export class PropsTooltips
{
    private _values : EnumDictionary<PropsKind, PropsTooltipValue> = {};

    constructor()
    {
        this.set(PropsKind.properties, 'Top level properties associated with this object.');
        this.set(PropsKind.config, 'Kubernetes YAML Configuration');
        this.set(PropsKind.labels, 'Kubernetes Labels');
        this.set(PropsKind.annotations, 'Kubernetes Annotations');

        this.set(PropsKind.env, 'Environment variables applied to this container. Also contains variables defined in related ConfigMaps.');

        this.set(PropsKind.resources, {
            owner: {
                [NodeKind.ns]: 'Resource usage for all pod replicas within the namespace.', 
                [NodeKind.app]: 'Resource usage for all pod replicas witing the application.',
                [NodeKind.initcont]: 'Resource usage for a single container.',
                [NodeKind.cont]: 'Resource usage for a single container.',
                [NodeKind.node]: 'Resources provided by this node.'
            },
            default: 'Resource usage.'
        });
        this.set(PropsKind.resourcesPerPod, 'Resource usage per single pod.');
        this.set(PropsKind.clusterConsumption, 'Consumption of overall cluster resources.');
        this.set(PropsKind.clusterResources, 'Resources provided by all nodes within the cluster.');
        this.set(PropsKind.nodeResources, 'Resources provided by a single node. Describes the weakest node in the cluster.');
        this.set(PropsKind.appConsumption, 'List of apps and resources they consume. Apps that tame most resources are on the top.');
    
        this.set(PropsKind.sharedWith, 'Other objects that also use this configuration.');

        this.set(PropsKind.ingressApp, 'Ingress network policy rules that allow or deny traffic from other applications.');
        this.set(PropsKind.ingressCidr, 'Ingress network policy rules that allow or deny traffic from CIDR blocks.');
        this.set(PropsKind.egressApp, 'Egress network policy rules that allow or deny traffic to other applications.');
        this.set(PropsKind.egressCidr, 'Egress network policy rules that allow or deny traffic to CIDR blocks.');
    }

    private set(key: PropsKind, value: PropsTooltipValue)
    {
        this._values[key] = value;
    }

    get(key: PropsKind) : PropsTooltipValue | null
    {
        const value = this._values[key];
        if (!value) {
            return null;
        }
        return value;
    }

}

export const PROPS_TOOLTIPS = new PropsTooltips();