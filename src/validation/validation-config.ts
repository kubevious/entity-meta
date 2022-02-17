import { ValidatorID } from './validator-id';

export type ValidatorSetting = undefined | 'error' | 'warn';

export type ValidationConfig = Record<ValidatorID, ValidatorSetting>;
// export type ValidationConfig = Record<keyof typeof ValidatorID, ValidatorSetting>;
