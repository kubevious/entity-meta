import _ from 'the-lodash';

export enum ValidatorID
{
    API_SERVICE_DISCONNECTED = 'API_SERVICE_DISCONNECTED',
    API_SERVICE_CONNECTION_ERROR = 'API_SERVICE_CONNECTION_ERROR',

    MISSING_ROLE = 'MISSING_ROLE',
    MISSING_SERVICE_ACCOUNT = 'MISSING_SERVICE_ACCOUNT',
    MISSING_PSP = 'MISSING_PSP',
    MISSING_CONFIG_MAP = 'MISSING_CONFIG_MAP',
    MISSING_SECRET = 'MISSING_SECRET',
    MISSING_PVC = 'MISSING_PVC',
    MISSING_PV = 'MISSING_PV',
    MISSING_OTHER = 'MISSING_OTHER',
    MISSING_APP = 'MISSING_APP', // HPA, Service,
    MISSING_SERVICE = 'MISSING_SERVICE',

    EMPTY_CONFIG_MAP = 'EMPTY_CONFIG_MAP',
    EMPTY_SECRET = 'EMPTY_SECRET',
    
    SERVICE_ACCOUNT_NOT_SET = 'SERVICE_ACCOUNT_NOT_SET',
    
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