import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNUSED_ROLE_BINDING(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_ROLE_BINDING)
    .category(ValidatorCategory.RBAC)
    .title('Unused RoleBinding')

    .description(
`RoleBinding grants Role permissions to ServiceAccounts or Users.

This validator detects RoleBindings that are not associated with
any application workloads.
`)
    .affected("RoleBinding")
    .affected("ClusterRoleBinding")
    .example(`
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
- kind: ServiceAccount
  name: backend
...
`)

    .resolution(`
Examine applications within the namespace and determine if ServiceAccount in
RoleBinding is supposed to be used in those workloads.`)
    .resolution(`
Make necessary naming corrections in RoleBinding ServiceAccount subject references.
`)
    .resolution(`
If the RoleBinding is indeed unused, it may need to be just removed.
`)

    .externalLink('https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-subjects')

}