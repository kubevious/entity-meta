import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupPOD_STATUS_NOT_INITIALIZED(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.POD_STATUS_NOT_INITIALIZED)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Status)
    .title('Stage 3. Pod not initialized')

    .description(
`During the launch, Pods go through a sequence of execution stages.
After scheduling the Pod on the Node and preparing containers,
Kubernetes will launch init containers.

This validator detects if at least one of the init containers within
this Pod failed to complete successfully.
`)
    .affected('Pod')
    .example(
`
kind: Pod
...
status:
  conditions:
    - type: Initialized
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z    
`)

.resolution('Check init container logs')
.externalLink('https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/')

}