import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupUNOWNED_REPLICA_SET(builder: ValidatorsDocsBuilder) {

    /* UNOWNED_REPLICA_SET */
    builder
    .validator(ID.UNOWNED_REPLICA_SET)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Controller)
    .title('Directly using ReplicaSet')
    .description(
`A ReplicaSet's purpose is to maintain a stable set of replica Pods running at any given time.
However, a Deployment is a higher-level concept that manages ReplicaSets and provides
declarative updates to Pods along with a lot of other useful features.
Therefore, we recommend using Deployments instead of directly using ReplicaSets.`)
    .affected('ReplicaSet')
    .example(
`
apiVersion: apps/v1
kind: ReplicaSet
  metadata:
    name: frontend
  spec:
    replicas: 3
    selector:
      matchLabels:
        tier: frontend
    template:
      metadata:
        labels:
          tier: frontend
      spec:
        containers:
          - name: nginx
            image: nginx:1.21.6
`)
    .resolution('Use Deployment instead of ReplicaSet. ')
    .resolutionExample(
`
apiVersion: apps/v1
kind: Deployment
  metadata:
    name: frontend
  spec:
    replicas: 3
    selector:
      matchLabels:
        tier: frontend
    template:
      metadata:
        labels:
          tier: frontend
        spec:
          containers:
            - name: nginx
              image: nginx:1.21.6
`)
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/')
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/deployment/')

}