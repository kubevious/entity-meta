import { ValidatorID } from './validator-id';

export enum ValidatorSetting
{
    off = 'off',
    error = 'error',
    warn = 'warn'
}

export type ValidationConfig = Record<ValidatorID, ValidatorSetting | undefined>;
// export type ValidationConfig = Record<keyof typeof ValidatorID, ValidatorSetting>;
