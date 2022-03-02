import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupPOD_STATUS_OTHER_CONDITION(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.POD_STATUS_OTHER_CONDITION)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Status)
    .title('Stage 5. Pod custom readiness gate failure')

    .description(
`Kubernetes allows the implementation of custom readiness checks
before the Pod is permitted to serve traffic.
This is very important when implementing operator patterns for stateful services.

This validator detects if the Pod custom readiness probes are failing.
`)
    .affected('Pod')
    .example(
`
kind: Pod
...
spec:
  readinessGates:
    - conditionType: "www.example.com/feature-1"
status:
  conditions:
    - type: "www.example.com/feature-1"
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z 
`)

.resolution('Check readiness gates and conditions')
.externalLink('https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-readiness-gate')

}