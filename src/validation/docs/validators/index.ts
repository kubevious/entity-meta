import { ValidatorsDocsBuilder } from '../builder';

import { setupContainerValidators } from './container';
import { setupComputeValidators } from './compute';
import { setupConfigValidators } from './config';
import { setupNetworkingValidators } from './networking';
import { setupStorageValidators } from './storage';
import { setupRBACValidators } from './rbac';
import { setupSecurityValidators } from './security';
import { setupApiValidators } from './api';

export const builder = new ValidatorsDocsBuilder();

setupContainerValidators(builder);
setupComputeValidators(builder);
setupConfigValidators(builder);
setupNetworkingValidators(builder);
setupStorageValidators(builder);
setupRBACValidators(builder);
setupSecurityValidators(builder);
setupApiValidators(builder);