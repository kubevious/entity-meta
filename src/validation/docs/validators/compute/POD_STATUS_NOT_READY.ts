import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupPOD_STATUS_NOT_READY(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.POD_STATUS_NOT_READY)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Status)
    .title('Stage 4. Pod not ready')

    .description(
`During the launch, Pods go through a sequence of execution stages.
After scheduling the Pod on the Node and preparing and launching all containers,
Kubernetes will check if the Pod is ready to serve requests.

This validator detects if the Pod is not ready to serve requests. 
Pod can become not ready if the readinessProbe has failed.
Also, there can be a readinessGates defined in the PodSpec
to check for other custom readiness conditions.
`)
    .affected('Pod')
    .example(
`
kind: Pod
...
status:
  conditions:
    - type: Ready
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z    
`)

.resolutionAndExample('Check Pod readinessProbe',
`
kind: Pod
...
spec:
  containers:
  - name: worker
    ports:
    - containerPort: 8080
    readinessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
`)
.resolutionAndExample('Check Pod readinessGates',
`
kind: Pod
...
spec:
  readinessGates:
    - conditionType: "www.example.com/feature-1"
status:
  conditions:
    - type: Ready                              # a built in PodCondition
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z
    - type: "www.example.com/feature-1"        # an extra PodCondition
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z
`)
.externalLink('https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/')
.externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/')

}