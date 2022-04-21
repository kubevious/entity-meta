import { ValidatorsDocsBuilder } from '../../builder';

import { setupMISSING_ROLE } from './MISSING_ROLE';
import { setupMISSING_BINDING_TO_SERVICE_ACCOUNT } from './MISSING_BINDING_TO_SERVICE_ACCOUNT';
import { setupMISSING_CONTAINER_TO_SERVICE_ACCOUNT } from './MISSING_CONTAINER_TO_SERVICE_ACCOUNT';
import { setupUNSET_SERVICE_ACCOUNT } from './UNSET_SERVICE_ACCOUNT';
import { setupUNUSED_SERVICE_ACCOUNT } from './UNUSED_SERVICE_ACCOUNT';
import { setupUNUSED_ROLE_BINDING } from './UNUSED_ROLE_BINDING';
import { setupUNUSED_ROLE } from './UNUSED_ROLE';
import { setupMISSING_SVC_ACCOUNT_SECRET } from './MISSING_SVC_ACCOUNT_SECRET';

export function setupRBACValidators(builder: ValidatorsDocsBuilder) {

    setupMISSING_ROLE(builder);
    setupMISSING_BINDING_TO_SERVICE_ACCOUNT(builder);
    setupMISSING_CONTAINER_TO_SERVICE_ACCOUNT(builder);
    setupUNSET_SERVICE_ACCOUNT(builder);
    setupUNUSED_SERVICE_ACCOUNT(builder);
    setupUNUSED_ROLE_BINDING(builder);
    setupUNUSED_ROLE(builder);
    setupMISSING_SVC_ACCOUNT_SECRET(builder);

}