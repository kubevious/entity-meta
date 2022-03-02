import { ValidatorsDocsBuilder } from '../../builder';

import { setupMISSING_PSP } from './MISSING_PSP';

export function setupSecurityValidators(builder: ValidatorsDocsBuilder) {

    setupMISSING_PSP(builder);

}