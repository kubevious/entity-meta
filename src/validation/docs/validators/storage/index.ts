import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

import { ValidatorsDocsBuilder } from '../../builder';

import { setupMISSING_PVC } from './MISSING_PVC';
import { setupMISSING_PV } from './MISSING_PV';
import { setupUNUSED_PVC } from './UNUSED_PVC';
import { setupUNUSED_PV } from './UNUSED_PV';

export function setupStorageValidators(builder: ValidatorsDocsBuilder) {

    setupMISSING_PVC(builder);
    setupMISSING_PV(builder);
    setupUNUSED_PVC(builder);
    setupUNUSED_PV(builder);

}