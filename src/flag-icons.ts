import { FlagKind } from './entities/flag-kind';

export class FlagIcons
{

    get(flag: FlagKind) : string | null
    {
        return `/img/flags/${flag}.svg`;
    }

}

export const FLAGS_ICONS = new FlagIcons();

