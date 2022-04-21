import { ValidatorsDocsBuilder } from '../../builder';

import { setupUNUSED_CONFIG_MAP } from './UNUSED_CONFIG_MAP';
import { setupUNUSED_SECRET } from './UNUSED_SECRET';

export function setupConfigValidators(builder: ValidatorsDocsBuilder) {

    setupUNUSED_CONFIG_MAP(builder);
    setupUNUSED_SECRET(builder);
    
}