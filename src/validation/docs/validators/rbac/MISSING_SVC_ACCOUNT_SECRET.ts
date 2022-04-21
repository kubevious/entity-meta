import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_SVC_ACCOUNT_SECRET(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_SVC_ACCOUNT_SECRET)
    .category(ValidatorCategory.RBAC)
    .title('Unresolved Secret reference in ServiceAccount')

    .description(
`Secrets are used to hold authentication tokens so ServiceAccounts can access
Kubernetes API Server.

This validator detects a condition when a Secret used in ServiceAccounts is not found.
`)
    .affected('ServiceAccount')
    .example(`
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2015-06-16T00:12:59Z
  name: build-robot
  namespace: default
  resourceVersion: "272500"
  uid: 721ab723-13bc-11e5-aec2-42010af0021e
secrets:
- name: build-robot-token-bvbk5              # Secret not found
`)

    .resolution(`Check if the Secret is present.`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Secret'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('Secret', 'ServiceAccount'))
    .resolution(RESOLUTION_TEXT.typoNameReference('Secret', 'ServiceAccount'))

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/')

}