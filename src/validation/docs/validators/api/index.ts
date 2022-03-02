import { ValidatorsDocsBuilder } from '../../builder';

import { setupAPI_SERVICE_DISCONNECTED } from './API_SERVICE_DISCONNECTED';
import { setupAPI_SERVICE_CONNECTION_ERROR } from './API_SERVICE_CONNECTION_ERROR';

export function setupApiValidators(builder: ValidatorsDocsBuilder) {

    setupAPI_SERVICE_DISCONNECTED(builder);
    setupAPI_SERVICE_CONNECTION_ERROR(builder);

}