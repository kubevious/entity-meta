import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_ROLE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_ROLE)
    .category(ValidatorCategory.RBAC)
    .title('Unresolved Role reference in RoleBinding')

    .description(
`RoleBinding grants Role permissions to Users or ServiceAccounts.

This validator detects when a Role used in RoleBinding is not found.
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
  name: backend
roleRef:
  kind: Role
  name: pod-reader                            # Role not found
  apiGroup: rbac.authorization.k8s.io
`)
.example(`
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: podreader                             # Name different
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
`)

    .resolution(`Check if the ClusterRole is present.`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Role'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('Role', 'RoleBinding'))
    .resolution(RESOLUTION_TEXT.typoNameReference('Role', 'RoleBinding'))


    .externalLink('https://kubernetes.io/docs/reference/access-authn-authz/rbac/')

}