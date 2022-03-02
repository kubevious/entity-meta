import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_HPA_APP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_HPA_APP)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.Scale)
    .title('Unresolved Application reference in HorizontalPodAutoscaler')
    .description(
`The purpose of HorizontalPodAutoscaler is to automatically update 
number of replicas of scalable resources (such as a Deployment or StatefulSet)
to match the current demand.

This validator detects a condition when a Deployment (or other scalable resource)
used in the HorizontalPodAutoscaler is not found. 
`)
    .affected('HorizontalPodAutoscaler')
    .example(
`
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 2
  maxReplicas: 5
  scaleTargetRef:
    kind: Deployment
    name: web-frontend        # Missing Deployment
    apiVersion: apps/v1
`)
    .example(
`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Deployment or StatefulSet'))
    .resolution(`Check if the Deployment or StatefulSet is present in a different namespace.
    Kubevious Search can be a very handy tool to find Deployments or StatefulSets across namespaces.
    You cannot autoscale Deployments from a different namespaces.
    In that case you would need to create a HorizontalPodAutoscaler in namespace where your workloads reside.`)
    .resolution(RESOLUTION_TEXT.typoNameReference('Deployment or StatefulSet', 'scaleTargetRef spec'))
    .externalLink('https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/')

    
}