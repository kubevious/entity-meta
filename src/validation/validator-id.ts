import _ from 'the-lodash';

export enum ValidatorID
{
    API_SERVICE_DISCONNECTED = 'API_SERVICE_DISCONNECTED',
    API_SERVICE_CONNECTION_ERROR = 'API_SERVICE_CONNECTION_ERROR',

    MISSING_ROLE = 'MISSING_ROLE',
    MISSING_BINDING_TO_SERVICE_ACCOUNT = 'MISSING_BINDING_TO_SERVICE_ACCOUNT',
    MISSING_CONTAINER_TO_SERVICE_ACCOUNT = 'MISSING_CONTAINER_TO_SERVICE_ACCOUNT',
    MISSING_PSP = 'MISSING_PSP',
    MISSING_VOLUME_MOUNT_CONFIG_MAP = 'MISSING_VOLUME_MOUNT_CONFIG_MAP',
    MISSING_ENV_CONFIG_MAP = 'MISSING_ENV_CONFIG_MAP',
    MISSING_VOLUME_MOUNT_SECRET = 'MISSING_VOLUME_MOUNT_SECRET',
    MISSING_ENV_SECRET = 'MISSING_ENV_SECRET',
    MISSING_PVC = 'MISSING_PVC',
    MISSING_PV = 'MISSING_PV',
    // MISSING_OTHER = 'MISSING_OTHER',
    MISSING_HPA_APP = 'MISSING_HPA_APP', 
    MISSING_SERVICE_APP = 'MISSING_SERVICE_APP',
    MISSING_INGRESS_SERVICE = 'MISSING_INGRESS_SERVICE',

    EMPTY_ENV_CONFIG_MAP = 'EMPTY_ENV_CONFIG_MAP',
    EMPTY_ENV_SECRET = 'EMPTY_ENV_SECRET',
    
    UNSET_SERVICE_ACCOUNT = 'UNSET_SERVICE_ACCOUNT',
    
    UNOWNED_REPLICA_SET = 'UNOWNED_REPLICA_SET',
    UNOWNED_POD = 'UNOWNED_POD',

    SERVICE_MULTIPLE_APPS = 'SERVICE_MULTIPLE_APPS',
    SERVICE_MISSING_PORT = 'SERVICE_MISSING_PORT',

    INGRESS_NOT_MOUNT_TO_APPS = 'INGRESS_NOT_MOUNT_TO_APPS',

    UNUSED_CONFIG_MAP = 'UNUSED_CONFIG_MAP',
    UNUSED_SERVICE_ACCOUNT = 'UNUSED_SERVICE_ACCOUNT',
    UNUSED_ROLE_BINDING = 'UNUSED_ROLE_BINDING',
    UNUSED_ROLE = 'UNUSED_ROLE',
    UNUSED_PVC = 'UNUSED_PVC',
    UNUSED_PV = 'UNUSED_PV',

    POD_STATUS_NOT_SCHEDULED = 'POD_STATUS_NOT_SCHEDULED',
    POD_STATUS_NOT_CONTAINERS_READY = 'POD_STATUS_NOT_CONTAINERS_READY',
    POD_STATUS_NOT_INITIALIZED = 'POD_STATUS_NOT_INITIALIZED',
    POD_STATUS_NOT_READY = 'POD_STATUS_NOT_READY',
    POD_STATUS_OTHER_CONDITION = 'POD_STATUS_OTHER_CONDITION',
}

export const VALIDATOR_IDs : ValidatorID[] = [];
for(const key in ValidatorID)
{
    VALIDATOR_IDs.push(key as ValidatorID); 
}