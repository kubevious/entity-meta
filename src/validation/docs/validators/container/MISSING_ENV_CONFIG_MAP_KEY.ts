import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupMISSING_ENV_CONFIG_MAP_KEY(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_ENV_CONFIG_MAP_KEY)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.EnvironmentVariables)
    .title('Unresolved ConfigMap Key reference in container environment variables')
    .description(
`You can use ConfigMaps as values for container environment variables.
This validator detects a condition when a ConfigMap data key used as a source for 
environment variables in the container spec is not found.
That can happen if the ConfigMap data key
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
                  name: my-config-map
                  key: bar               # Key bar not present in the configMap
                  optional: false
`)
.example(
`
kind: ConfigMap
metadata:
  name: my-config-map
data: 
  foo: bar
`)
    .resolution('Check the data section of the ConfigMap. Ensure that the key referenced in the valueFrom is present.')
    
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')

    
}