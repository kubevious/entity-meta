import { ValidatorsDocsBuilder } from '../../builder';

import { setupMISSING_SERVICE_APP } from './MISSING_SERVICE_APP'
import { setupMISSING_INGRESS_SERVICE } from './MISSING_INGRESS_SERVICE'
import { setupMISSING_INGRESS_SERVICE_PORT } from './MISSING_INGRESS_SERVICE_PORT'
import { setupSERVICE_MULTIPLE_APPS } from './SERVICE_MULTIPLE_APPS'
import { setupSERVICE_MISSING_PORT } from './SERVICE_MISSING_PORT'
import { setupINGRESS_NOT_MOUNT_TO_APPS } from './INGRESS_NOT_MOUNT_TO_APPS'

export function setupNetworkingValidators(builder: ValidatorsDocsBuilder) {

    setupMISSING_SERVICE_APP(builder);
    setupMISSING_INGRESS_SERVICE(builder);
    setupMISSING_INGRESS_SERVICE_PORT(builder);
    setupSERVICE_MULTIPLE_APPS(builder);
    setupSERVICE_MISSING_PORT(builder);
    setupINGRESS_NOT_MOUNT_TO_APPS(builder);

}