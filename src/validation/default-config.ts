import { ValidatorID as ID } from './validator-id';
import { ValidationConfig } from './validation-config';

export const DEFAULT_VALIDATION_CONFIG : ValidationConfig = {

    [ID.API_SERVICE_DISCONNECTED]: "warn",
    [ID.API_SERVICE_CONNECTION_ERROR]: "error",

    [ID.MISSING_ROLE]: "error",
    [ID.MISSING_SERVICE_ACCOUNT]: "error",
    [ID.MISSING_PSP]: "error",
    [ID.MISSING_CONFIG_MAP]: "error",
    [ID.MISSING_SECRET]: "error",
    [ID.MISSING_PVC]: "error",
    [ID.MISSING_PV]: "error",
    [ID.MISSING_OTHER]: "error",
    [ID.MISSING_APP]: "error", // Used in HPA, Service
    [ID.MISSING_SERVICE]: "error",

    [ID.EMPTY_CONFIG_MAP]: "warn",
    [ID.EMPTY_SECRET]: "warn",

    [ID.SERVICE_ACCOUNT_NOT_SET]: "warn",

    [ID.UNOWNED_REPLICA_SET]: "warn",
    [ID.UNOWNED_POD]: "warn",

    [ID.SERVICE_MULTIPLE_APPS]: "warn",
    [ID.SERVICE_MISSING_PORT]: "error",

    [ID.INGRESS_NOT_MOUNT_TO_APPS]: "error",

    [ID.UNUSED_CONFIG_MAP]: "warn",
    [ID.UNUSED_SERVICE_ACCOUNT]: "warn",
    [ID.UNUSED_CRB]: "warn",
    [ID.UNUSED_ROLE]: "warn",
    [ID.UNUSED_PVC]: "warn",
    [ID.UNUSED_PV]: "warn",

    [ID.POD_STATUS_NOT_SCHEDULED]: "error",
    [ID.POD_STATUS_NOT_CONTAINERS_READY]: "error",
    [ID.POD_STATUS_NOT_INITIALIZED]: "error",
    [ID.POD_STATUS_NOT_READY]: "error",
    [ID.POD_STATUS_OTHER_CONDITION]: "error",

}