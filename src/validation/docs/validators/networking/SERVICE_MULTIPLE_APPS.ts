import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupSERVICE_MULTIPLE_APPS(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.SERVICE_MULTIPLE_APPS)
    .category(ValidatorCategory.Networking)
    .title('Multiple Applications mapped to a single Service')

    .description(
`Services connect Kubernetes applications.
Label selectors are used to associating Pods with Services.

This validator detects a condition when there are more than one applications
associated with a Service.
It usually indicates that label selector is loosely defined resulting in multiple
apps referred by a Service.
`)
    .affected('Service')
    .example(
`
apiVersion: v1
kind: Service
metadata:
  name: billing-service
spec:
  type: ClusterIP
  selector:
    component: backend          # Is the app: billing missing?
`)
.example(`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing-app
  labels:
    component: backend
    app: billing
`)
.example(`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout-app
  labels:
    component: backend
    app: checkout
`)

    .resolution(`
Identify which application should the Service refer to.`)
    .resolution(`
Add necessary labels to the Service selector.
`)
    .resolution(`
There is a possible false positive trigger for this validator.
Sometimes a single application is launched using multiple Deployments. 
For example, a redis-master and redis-slave nodes are deployed using
individual Deployments, yet a single Service points to all redis nodes,
regardless of whether they are masters or slaves.
`)    
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/')
    
}