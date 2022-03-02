import { ValidatorsDocsBuilder } from '../../builder';

import { setupMISSING_ENV_CONFIG_MAP } from './MISSING_ENV_CONFIG_MAP'
import { setupMISSING_ENV_SECRET } from './MISSING_ENV_SECRET'
import { setupEMPTY_ENV_CONFIG_MAP } from './EMPTY_ENV_CONFIG_MAP'
import { setupEMPTY_ENV_SECRET } from './EMPTY_ENV_SECRET'
import { setupMISSING_VOLUME_MOUNT_CONFIG_MAP } from './MISSING_VOLUME_MOUNT_CONFIG_MAP'
import { setupMISSING_VOLUME_MOUNT_SECRET } from './MISSING_VOLUME_MOUNT_SECRET'

export function setupContainerValidators(builder: ValidatorsDocsBuilder) {

  setupMISSING_ENV_CONFIG_MAP(builder);
  setupMISSING_ENV_SECRET(builder);
  setupEMPTY_ENV_CONFIG_MAP(builder);
  setupEMPTY_ENV_SECRET(builder);
  setupMISSING_VOLUME_MOUNT_CONFIG_MAP(builder);
  setupMISSING_VOLUME_MOUNT_SECRET(builder);
  
}