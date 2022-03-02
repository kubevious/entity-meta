import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_BINDING_TO_SERVICE_ACCOUNT(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_BINDING_TO_SERVICE_ACCOUNT)
    .category(ValidatorCategory.RBAC)
    .title('Unresolved ServiceAccount reference in Binding')

    .description(
`RoleBinding grants Roles permissions to ServiceAccounts or Users.

This validator detects when a ServiceAccount used in RoleBinding is not found.
`)
    .affected('RoleBinding')
    .affected('ClusterRoleBinding')
    .example(`
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
- kind: ServiceAccount
  name: backend                            # Service Account not found
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
`)
.example(`
apiVersion: v1
kind: ServiceAccount
metadata:
  name: saas-backend                        # Different name
`)

    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('ServiceAccount'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('ServiceAccount', 'RoleBinding'))
    .resolution(RESOLUTION_TEXT.typoNameReference('ServiceAccount', 'RoleBinding'))

    .externalLink('https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-subjects')

}