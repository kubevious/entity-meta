import { FlagKind } from './entities/flag-kind';
import { EnumDictionary } from './types';

export class FlagsTooltips
{
    private _values : EnumDictionary<FlagKind, string> = {};

    constructor()
    {
        this.set(FlagKind.radioactive, '<strong>Radioactive</strong>. This object, or its descendants are using excessive permissions like priviledged containers, host network, etc. See <strong>\"Radioactivity\"</strong> properties on affected <strong>Containers</strong> and <strong>Launchers</strong>.');
        this.set(FlagKind.xnamespace, '<strong>Spy</strong>. This object, or its descendants have access to Kubernetes APIs beyond the namespace. See <strong>\"Resource Role Matrix\"</strong> properties on affected <strong>Service Accounts</strong> and <strong>Role Bindings</strong>.');
        this.set(FlagKind.shared, '<strong>Shared</strong>. This object is shared and any changes would cascade to dependents. See <strong>\"Shared With\"</strong> properties for list of dependents.');
    }

    private set(key: FlagKind, value: string)
    {
        this._values[key] = value;
    }

    get(key: FlagKind) : string | null
    {
        const value = this._values[key];
        if (!value) {
            return null;
        }
        return value;
    }

}

export const FLAGS_TOOLTIPS = new FlagsTooltips();

