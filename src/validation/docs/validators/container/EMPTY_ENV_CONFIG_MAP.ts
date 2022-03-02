import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupEMPTY_ENV_CONFIG_MAP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.EMPTY_ENV_CONFIG_MAP)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.EnvironmentVariables)
    .title('Empty ConfigMap used in container environment variables')
    .description(
`You can use ConfigMaps as values for container environment variables.
This validator detects when a ConfigMap used as a source for environment variables is empty.
Because of that, no environment variables will be sources from the ConfigMap.
`)
    .affectedAllWorkloads()
    .example(
`
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: my-container
          envFrom:
            - configMapRef:
              name: my-config-map # This ConfigMap is empty
`)
    .example(
`
kind: ConfigMap
metadata:
  name: my-config-map
data: {}                          # Empty data or no data at all
`)
    .resolution(RESOLUTION_TEXT.populateEnvVarsData('ConfigMap'))
    .resolution(RESOLUTION_TEXT.deleteEnvVarsSource('ConfigMap'))
    .resolutionExample(
`
kind: ConfigMap
metadata:
  name: my-config-map
data: 
  ENV_FOO: bar
`)
    .resolutionExample(
`$ kubectl delete configmap my-config-map -n <the-namespace>`, 'shell')

    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')
        

    
}