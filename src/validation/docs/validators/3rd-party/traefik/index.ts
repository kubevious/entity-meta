import { ValidatorsDocsBuilder } from '../../../builder';

import { setupTRAEFIK_MISSING_MIDDLEWARE } from './TRAEFIK_MISSING_MIDDLEWARE';
import { setupTRAEFIK_MISSING_SERVICE } from './TRAEFIK_MISSING_SERVICE';
import { setupTRAEFIK_MISSING_TLS_OPTIONS } from './TRAEFIK_MISSING_TLS_OPTIONS';
import { setupTRAEFIK_UNUSED_MIDDLEWARE } from './TRAEFIK_UNUSED_MIDDLEWARE';
import { setupTRAEFIK_UNUSED_SERVICE } from './TRAEFIK_UNUSED_SERVICE';
import { setupTRAEFIK_UNUSED_TLS_OPTIONS } from './TRAEFIK_UNUSED_TLS_OPTIONS';


export function setupTraefik(builder: ValidatorsDocsBuilder) {

    setupTRAEFIK_MISSING_MIDDLEWARE(builder);
    setupTRAEFIK_MISSING_SERVICE(builder);
    setupTRAEFIK_MISSING_TLS_OPTIONS(builder);
    setupTRAEFIK_UNUSED_MIDDLEWARE(builder);
    setupTRAEFIK_UNUSED_SERVICE(builder);
    setupTRAEFIK_UNUSED_TLS_OPTIONS(builder);

}