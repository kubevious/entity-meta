import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_ENV_CONFIG_MAP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_ENV_CONFIG_MAP)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.EnvironmentVariables)
    .title('Unresolved ConfigMap reference in container environment variables')
    .description(
`You can use ConfigMaps as values for container environment variables.
This validator detects a condition when a ConfigMap used as a source for 
environment variables in the container spec is not found.
That can happen if the ConfigMap
was deleted or renamed, or there was a typo in the envFrom.configMapKeyRef.
Note that this check is skipped when the reference is marked as optional.`)
    .affectedAllWorkloads()
    .example(
`
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: my-container
          env:
            - name: MY_ENV_VAR
              valueFrom:
                configMapKeyRef:
                  name: my-config-map  # This ConfigMap is not present
                  key: key-in-my-config-map
                  optional: false
          envFrom:
            - configMapRef:
                name: my-other-config-map # This ConfigMap is not present
                optional: false
`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('ConfigMap'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('ConfigMap', 'Pod'))
    .resolution(RESOLUTION_TEXT.typoNameReference('ConfigMap', 'container environment variables spec'))
    
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')

    
}