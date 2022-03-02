import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupPOD_STATUS_NOT_CONTAINERS_READY(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.POD_STATUS_NOT_CONTAINERS_READY)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Status)
    .title('Stage 2. Pod containers not ready')

    .description(
`During the launch, Pods go through a sequence of execution stages.
Right after scheduling the Pod on the Node, Kubernetes will start preparing
the containers. 

This validator detects at least one of the containers within this Pod is not ready.
`)
    .affected('Pod')
    .example(
`
kind: Pod
...
status:
  conditions:
    - type: ContainersReady
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z
  containerStatuses:
    - containerID: docker://abcd...
      ready: true      
`)

// TODO: When does this happen? 
// TODO: Resolutions?
// TODO: Failed to pull an image?
.externalLink('https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/')

}