import { ValidatorsDocsBuilder } from '../../builder';

import { setupTraefik } from './traefik';

export function setup3rdParty(builder: ValidatorsDocsBuilder) {

    setupTraefik(builder);

}