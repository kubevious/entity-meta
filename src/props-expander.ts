import _ from 'the-lodash';
import { PropsId } from './entities/props-id';
import { EnumDictionary } from './types';

export class PropsExpanderDict
{
    private _expanded : EnumDictionary<PropsId, boolean> = {};

    constructor()
    {
        this.setExpanded(PropsId.targetLinks, true);
        this.setExpanded(PropsId.sharedWith, true);
        this.setExpanded(PropsId.usedBy, true);
        this.setExpanded(PropsId.config, true);
        this.setExpanded(PropsId.health, true);
        this.setExpanded(PropsId.podStages, true);
        this.setExpanded(PropsId.resourceRoleMatrix, true);
    }

    protected setExpanded(key: PropsId, value: boolean)  : void
    {
        this._expanded[key] = value;
    }

    get(id: PropsId) : boolean
    {
        const value = this._expanded[id];
        if (value) {
            return true;
        }
        return false;
    }

}

export const PROPS_EXPANDED = new PropsExpanderDict();