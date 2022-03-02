import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupUNOWNED_POD(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNOWNED_POD)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Controller)
    .title('Directly launching a Pod')
    .description(
`In Kubernetes Pod is considered a low level construct.
Directly instantiating Pods is not recommended.
Instead there are higher level controllers available to launch and maintain Pods.
Consider using Deployment, DaemonSet, StatefulSet, Job or CronJob instead.`)
    .affected('Pod')
    .example(
`
apiVersion: v1
kind: Pod
metadata:
  name: frontend
spec:
  containers:
    - name: nginx
      image: nginx:1.21.6
`)
    .resolution('Use Deployment instead of Pods. ')
    .resolutionExample(
`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
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
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/deployment/')
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/')
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/')
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/job/')
.externalLink('https://kubernetes.io/docs/concepts/workloads/controllers/cronjob/')
}
