import { ValidatorsDocsBuilder } from '../../builder';

import { setupUNOWNED_REPLICA_SET } from './UNOWNED_REPLICA_SET'
import { setupUNOWNED_POD } from './UNOWNED_POD'
import { setupMISSING_HPA_APP } from './MISSING_HPA_APP'
import { setupPOD_STATUS_NOT_SCHEDULED } from './POD_STATUS_NOT_SCHEDULED'
import { setupPOD_STATUS_NOT_CONTAINERS_READY } from './POD_STATUS_NOT_CONTAINERS_READY'
import { setupPOD_STATUS_NOT_INITIALIZED } from './POD_STATUS_NOT_INITIALIZED'
import { setupPOD_STATUS_NOT_READY } from './POD_STATUS_NOT_READY'
import { setupPOD_STATUS_OTHER_CONDITION } from './POD_STATUS_OTHER_CONDITION'

export function setupComputeValidators(builder: ValidatorsDocsBuilder) {

    setupUNOWNED_REPLICA_SET(builder);
    setupUNOWNED_POD(builder);
    
    setupMISSING_HPA_APP(builder);

    setupPOD_STATUS_NOT_SCHEDULED(builder);
    setupPOD_STATUS_NOT_CONTAINERS_READY(builder);
    setupPOD_STATUS_NOT_INITIALIZED(builder);
    setupPOD_STATUS_NOT_READY(builder);
    setupPOD_STATUS_OTHER_CONDITION(builder);

}