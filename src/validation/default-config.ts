import { ValidatorID as ID } from './validator-id';
import { ValidationConfig, ValidatorSetting } from './validation-config';

export const DEFAULT_VALIDATION_CONFIG : ValidationConfig = {

    [ID.API_SERVICE_DISCONNECTED]: ValidatorSetting.warn,
    [ID.API_SERVICE_CONNECTION_ERROR]: ValidatorSetting.error,

    [ID.MISSING_ROLE]: ValidatorSetting.error,
    [ID.MISSING_SERVICE_ACCOUNT]: ValidatorSetting.error,
    [ID.MISSING_PSP]: ValidatorSetting.error,
    [ID.MISSING_CONFIG_MAP]: ValidatorSetting.error,
    [ID.MISSING_SECRET]: ValidatorSetting.error,
    [ID.MISSING_PVC]: ValidatorSetting.error,
    [ID.MISSING_PV]: ValidatorSetting.error,
    [ID.MISSING_OTHER]: ValidatorSetting.error,
    [ID.MISSING_APP]: ValidatorSetting.error, // Used in HPA, Service
    [ID.MISSING_SERVICE]: ValidatorSetting.error,

    [ID.EMPTY_CONFIG_MAP]: ValidatorSetting.warn,
    [ID.EMPTY_SECRET]: ValidatorSetting.warn,

    [ID.SERVICE_ACCOUNT_NOT_SET]: ValidatorSetting.warn,

    [ID.UNOWNED_REPLICA_SET]: ValidatorSetting.warn,
    [ID.UNOWNED_POD]: ValidatorSetting.warn,

    [ID.SERVICE_MULTIPLE_APPS]: ValidatorSetting.warn,
    [ID.SERVICE_MISSING_PORT]: ValidatorSetting.error,

    [ID.INGRESS_NOT_MOUNT_TO_APPS]: ValidatorSetting.error,

    [ID.UNUSED_CONFIG_MAP]: ValidatorSetting.warn,
    [ID.UNUSED_SERVICE_ACCOUNT]: ValidatorSetting.warn,
    [ID.UNUSED_ROLE_BINDING]: ValidatorSetting.warn,
    [ID.UNUSED_ROLE]: ValidatorSetting.warn,
    [ID.UNUSED_PVC]: ValidatorSetting.warn,
    [ID.UNUSED_PV]: ValidatorSetting.warn,

    [ID.POD_STATUS_NOT_SCHEDULED]: ValidatorSetting.error,
    [ID.POD_STATUS_NOT_CONTAINERS_READY]: ValidatorSetting.error,
    [ID.POD_STATUS_NOT_INITIALIZED]: ValidatorSetting.error,
    [ID.POD_STATUS_NOT_READY]: ValidatorSetting.error,
    [ID.POD_STATUS_OTHER_CONDITION]: ValidatorSetting.error,
}