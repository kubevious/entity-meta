import _ from 'the-lodash';
import { PropsId } from './entities/props-id';
import { EnumDictionary } from './types';

export class PropsOrderDict
{
    private _orderDict : EnumDictionary<PropsId, number> = {};

    constructor()
    {
        this.setTitle(PropsId.targetLinks, 10);

        this.setTitle(PropsId.sharedWith, 20);
        this.setTitle(PropsId.usedBy, 30);

        this.setTitle(PropsId.properties, 40);

        this.setTitle(PropsId.health, 45);

        this.setTitle(PropsId.labels, 50);
        this.setTitle(PropsId.annotations, 60);
        
        this.setTitle(PropsId.resources, 200);
        this.setTitle(PropsId.resourcesPerPod, 210);
        this.setTitle(PropsId.nodeResources, 220);
        this.setTitle(PropsId.poolResources, 230);
        this.setTitle(PropsId.clusterConsumption, 240);
        this.setTitle(PropsId.clusterResources, 250);
        this.setTitle(PropsId.appConsumption, 260);

        this.setTitle(PropsId.resourceRoleMatrix, 300);

        this.setTitle(PropsId.ingressApp, 400);
        this.setTitle(PropsId.ingressCidr, 410);
        this.setTitle(PropsId.egressApp, 420);
        this.setTitle(PropsId.egressCidr, 430);

        this.setTitle(PropsId.radioactive, 510);

        this.setTitle(PropsId.env, 520);

        this.setTitle(PropsId.mount, 530);

        this.setTitle(PropsId.config, 700);

        this.setTitle(PropsId.contents, 800);

        this.setTitle(PropsId.ruleAssistant, 5000);
    }

    protected setTitle(key: PropsId, value: number)  : void
    {
        this._orderDict[key] = value;
    }

    get(id: PropsId) : number
    {
        const value = this._orderDict[id];
        if (value) {
            return value;
        }

        console.error("[PropsOrderDict] Could not resolve value for: %s", id);
        // throw new Error("Could not resolve value for: " + id);
        return 600;
    }

}

export const PROPS_ORDER = new PropsOrderDict();