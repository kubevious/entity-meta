import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNUSED_SERVICE_ACCOUNT(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_SERVICE_ACCOUNT)
    .category(ValidatorCategory.RBAC)
    .title('Unused ServiceAccount')

    .description(
`ServiceAccounts grant Kubernetes API permissions to workloads. 

This validator detects ServiceAccounts that are not associated with any workloads.
This check is ignored for "default" ServiceAccounts.
`)
    .affected('ServiceAccount')
    .example(`
apiVersion: v1
kind: ServiceAccount
metadata:
  name: robot                            # Unused Service Account
`)    
    .example(
`
kind: Deployment
spec:
  template:
    spec:
      serviceAccountName: build-robot    # Was this a typo?
...
`)

    .resolution(`
Examine applications within the namespace and determine if the ServiceAccount is supposed to
be used in workloads.`)
    .resolution(`
If the ServiceAccount is supposed to be used, either correct the ServiceAccount name or
the reference in the workload.
`)
    .resolution(`
If the ServiceAccount is indeed unused, it may need to be just removed.
`)

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/')

}