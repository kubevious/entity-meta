import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_PSP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_PSP)
    .category(ValidatorCategory.Security)
    .title('Unresolved PodSecurityPolicy reference in Binding')

    .description(
`PodSecurityPolicies enable fine-grained authorization of pod creation and updates.

This validator detects when a PodSecurityPolicy used in the Roles is not found.
`)
    .affected('Role')
    .affected('ClusterRole')

    .example(`
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: <role name>
rules:
- apiGroups: ['policy']
  resources: ['podsecuritypolicies']
  verbs:     ['use']
  resourceNames:
    - policy-foo             # policy-foo not found
`)

    .example(`
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: policy-bar           # Maybe use policy-bar instead?
spec:
  privileged: false
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  runAsUser:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
  volumes:
  - '*'
`)

    .resolution(`Check if the PodSecurityPolicy is present.`)
    .resolution(RESOLUTION_TEXT.typoNameReference('PodSecurityPolicy', 'Role'))

    .externalLink('https://kubernetes.io/docs/concepts/policy/pod-security-policy/')

}