import _ from 'the-lodash';
import { PropsId } from './entities/props-id';
import { EnumDictionary } from './types';

export class PropsTitlesDict
{
    private _titleDict : EnumDictionary<PropsId, string> = {};

    constructor()
    {
        this.setTitle(PropsId.properties, 'Properties');
        this.setTitle(PropsId.config, 'Config');
        this.setTitle(PropsId.labels, 'Labels');
        this.setTitle(PropsId.annotations, 'Annotations');
        
        this.setTitle(PropsId.targetLinks, 'Links');

        this.setTitle(PropsId.env, 'Environment Variables');

        this.setTitle(PropsId.resources, 'Resources');
        this.setTitle(PropsId.resourcesPerPod, 'Resources Per Pod');
        this.setTitle(PropsId.nodeResources, 'Node Resources');
        this.setTitle(PropsId.poolResources, 'Pool Resources');
        this.setTitle(PropsId.clusterConsumption, 'Cluster Consumption');
        this.setTitle(PropsId.clusterResources, 'Cluster Resources');
        this.setTitle(PropsId.appConsumption, 'Application Consumption');

        this.setTitle(PropsId.resourceRoleMatrix, 'Resource Role Matrix');

        this.setTitle(PropsId.sharedWith, 'Shared With');
        this.setTitle(PropsId.usedBy, 'Used By');

        this.setTitle(PropsId.ingressApp, 'Ingress Application Rules');
        this.setTitle(PropsId.ingressCidr, 'Ingress CIDR Rules');
        this.setTitle(PropsId.egressApp, 'Egress Application Rules');
        this.setTitle(PropsId.egressCidr, 'Egress CIDR Rules');

        this.setTitle(PropsId.targetLinks, 'Target Links');

        this.setTitle(PropsId.radioactive, 'Radioactivity');

        this.setTitle(PropsId.contents, 'Contents');

        this.setTitle(PropsId.mount, 'Mount Config');

        this.setTitle(PropsId.health, 'Health');
        this.setTitle(PropsId.podStages, 'Pod Stages and Health');

        // Summary
        
        this.setTitle(PropsId.appCounters, 'Configuration Summary');
        this.setTitle(PropsId.infraCounters, 'Infrastructure Summary');
        this.setTitle(PropsId.topIssueNamespaces, 'Top Namespaces with Issues');
        this.setTitle(PropsId.topIssues, 'Top Issues');


        // Rules
        this.setTitle(PropsId.ruleAssistant, 'Rule Assistant');
    }

    protected setTitle(key: PropsId, value: string)  : void
    {
        this._titleDict[key] = value;
    }

    get(id: PropsId)
    {
        const value = this._titleDict[id];
        if (value) {
            return value;
        }

        console.error("[PropsTitlesDict] Could not resolve value for: %s", id);
        // throw new Error("Could not resolve value for: " + id);
        return id.toString();
    }

}

export const PROPS_TITLES = new PropsTitlesDict();