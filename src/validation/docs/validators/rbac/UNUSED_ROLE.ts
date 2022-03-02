import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNUSED_ROLE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_ROLE)
    .category(ValidatorCategory.RBAC)
    .title('Unused Role')

    .description(
`RoleBinding grants Role permissions to Users or ServiceAccounts.

This validator detects Roles that are not associated with
any application workloads.
`)
    .affected("Role")
    .affected("ClusterRole")
    .example(`
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: podreader                             
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
`)    
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
  name: pod-reader                            # Different Rule used
  apiGroup: rbac.authorization.k8s.io
`)

    .resolution(`
Examine RoleBindings and check if the Role is correctly referenced.`)
    .resolution(`
Make necessary naming corrections in RoleBinding Role references.
`)
    .resolution(`
Examine applications within the namespace and determine if ServiceAccount in
RoleBinding is supposed to be used in those workloads.`)
    .resolution(`
If the Role is indeed unused, it may need to be just removed.
`)

    .externalLink('https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-subjects')

}