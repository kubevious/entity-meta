import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNSET_SERVICE_ACCOUNT(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNSET_SERVICE_ACCOUNT)
    .category(ValidatorCategory.RBAC)
    .title('ServiceAccount not specified in container')
    
    .description(
`ServiceAccounts grant Kubernetes API permissions to workloads. 
To use a non-default ServiceAccount, the serviceAccountName field property should be set.

This validator detects when there is no ServiceAccount explicitly set on a workload.
`)
    .affectedAllWorkloads()
    .example(
`
kind: Deployment
spec:
  template:
    spec:
    # serviceAccountName:    # field not set
...
`)

    .resolution(`
This condition doesn't always indicate an error. It is a useful tool for SREs to quickly
identify which workloads don't have ServiceAccounts explicitly associated.

This validator is disabled by default.
    `)

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/')

}