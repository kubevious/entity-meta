import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupPOD_STATUS_NOT_SCHEDULED(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.POD_STATUS_NOT_SCHEDULED)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Status)
    .title('Stage 1. Pod not scheduled')
    .description(
`During the launch, Pods go through a sequence of execution stages.
The first stage is to assign a Node on which the Pod should launch.
This validator detects a condition when a Pod is not yet scheduled to run on a Node.

There are numerous reasons why Pods can be stuck in the scheduling stage.
The reasons can be combinations of insufficient cluster resources,
suboptimal node selectors, node affinity, pod affinity and anti-affinity, PodOverhead,
node taints, and tolerations. There is also a NodeRestriction admission
controller available as a plugin which can restrict scheduling of certain
workloads on certain nodes.

Refer to the links below for details on troubleshooting Pod scheduling failures.
`)
    .affected('Pod')
    .example(
`
kind: Pod
...
status:
  conditions:
    - type: PodScheduled
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2022-01-01T00:00:00Z
`)
    .resolution('Check if cluster has enough resources')
    .resolutionAndExample('Check the nodeSelector',
`
# Node Selector
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
  nodeSelector:
    disktype: ssd 
`)
    .resolutionAndExample('Check node affinity',
`
# Node Affinity
apiVersion: v1
kind: Pod
metadata:
  name: with-node-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/e2e-az-name
            operator: In
            values:
            - e2e-az1
            - e2e-az2
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: another-node-label-key
            operator: In
            values:
            - another-node-label-value
  containers:
  - name: with-node-affinity
    image: k8s.gcr.io/pause:2.0
`)
    .resolutionAndExample('Check pod affinity and anti-affinity',
`
# Pod Affinity and Anti-Affinity
apiVersion: v1
kind: Pod
metadata:
  name: with-pod-affinity
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: topology.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: security
              operator: In
              values:
              - S2
          topologyKey: topology.kubernetes.io/zone
  containers:
  - name: with-pod-affinity
    image: k8s.gcr.io/pause:2.0
`)
  .resolutionAndExample('Check PodOverhead feature',
`
# PodOverhead
---
kind: RuntimeClass
apiVersion: node.k8s.io/v1
metadata:
  name: kata-fc
handler: kata-fc
overhead:
  podFixed:
    memory: "120Mi"
    cpu: "250m"

---
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  runtimeClassName: kata-fc
  containers:
  - name: busybox-ctr
    image: busybox
    stdin: true
    tty: true
    resources:
      limits:
        cpu: 500m
        memory: 100Mi
  - name: nginx-ctr
    image: nginx
    resources:
      limits:
        cpu: 1500m
        memory: 100Mi
`)
  .resolutionAndExample('Check Node Taints and Pod Tolerations feature',
`
# Taints and Tolerations
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "example-key"
    operator: "Exists"
    effect: "NoSchedule"
`)

.externalLink('https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-conditions')
.externalLink('https://kubernetes.io/docs/concepts/scheduling-eviction/')
.externalLink('https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/')
.externalLink('https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/')
.externalLink('https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction')
.externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#PodStatus')

}