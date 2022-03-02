import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_CONTAINER_TO_SERVICE_ACCOUNT(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_CONTAINER_TO_SERVICE_ACCOUNT)
    .category(ValidatorCategory.RBAC)
    .title('Unresolved ServiceAccount reference in container')

    .description(
`ServiceAccounts grant Kubernetes API permissions to workloads. 

This validator detects when a ServiceAccount referred in a workload is not found.
`)
    .affectedAllWorkloads()
    .example(
`
kind: Deployment
spec:
  template:
    spec:
      serviceAccountName: build-robot    # Service Account not found
...
`)    
    .example(`
apiVersion: v1
kind: ServiceAccount
metadata:
  name: robot                            # Different name
`)

    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('ServiceAccount'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('ServiceAccount', 'workload'))
    .resolution(RESOLUTION_TEXT.typoNameReference('ServiceAccount', 'workload'))

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/')

}