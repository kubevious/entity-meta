import { PropsId } from './entities/props-id';
import { NodeKind } from './entities/node-kind';
import { EnumDictionary } from './types';

export type PropsTooltipValue = string | PropsComplexTooltipValue;

export type PropsComplexTooltipValue = {
    owner: EnumDictionary<NodeKind, string>,
    default: string
}

export class PropsTooltips
{
    private _values : EnumDictionary<PropsId, PropsTooltipValue> = {};

    constructor()
    {
        this.set(PropsId.properties, 'Top level properties associated with this object.');
        this.set(PropsId.config, 'Kubernetes YAML Configuration');
        this.set(PropsId.labels, 'Kubernetes Labels');
        this.set(PropsId.annotations, 'Kubernetes Annotations');

        this.set(PropsId.env, 'Environment variables applied to this container. Also contains variables defined in related ConfigMaps.');

        this.set(PropsId.resources, {
            owner: {
                [NodeKind.ns]: 'Resource usage for all pod replicas within the namespace.', 
                [NodeKind.app]: 'Resource usage for all pod replicas witing the application.',
                [NodeKind.initcont]: 'Resource usage for a single container.',
                [NodeKind.cont]: 'Resource usage for a single container.',
                [NodeKind.node]: 'Resources provided by this node.'
            },
            default: 'Resource usage.'
        });
        this.set(PropsId.resourcesPerPod, 'Resource usage per single pod.');
        this.set(PropsId.clusterConsumption, 'Consumption of overall cluster resources.');
        this.set(PropsId.clusterResources, 'Resources provided by all nodes within the cluster.');
        this.set(PropsId.nodeResources, 'Resources provided by a single node. Describes the weakest node in the cluster.');
        this.set(PropsId.appConsumption, 'List of apps and resources they consume. Apps that tame most resources are on the top.');
    
        this.set(PropsId.sharedWith, 'Other objects that also use this configuration.');

        this.set(PropsId.ingressApp, 'Ingress network policy rules that allow or deny traffic from other applications.');
        this.set(PropsId.ingressCidr, 'Ingress network policy rules that allow or deny traffic from CIDR blocks.');
        this.set(PropsId.egressApp, 'Egress network policy rules that allow or deny traffic to other applications.');
        this.set(PropsId.egressCidr, 'Egress network policy rules that allow or deny traffic to CIDR blocks.');
    }

    private set(key: PropsId, value: PropsTooltipValue)
    {
        this._values[key] = value;
    }

    get(key: PropsId) : PropsTooltipValue | null
    {
        const value = this._values[key];
        if (!value) {
            return null;
        }
        return value;
    }

}

export const PROPS_TOOLTIPS = new PropsTooltips();