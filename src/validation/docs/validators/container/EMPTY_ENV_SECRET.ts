import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupEMPTY_ENV_SECRET(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.EMPTY_ENV_SECRET)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.EnvironmentVariables)
    .title('Empty Secret used in container environment variables')
    .description(
`You can use Secrets as values for container environment variables.
This validator detects when a Secret used as a source for environment variables is empty.
Because of that, no environment variables will be sources from the Secret.
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
            - secretRef:
                name: my-secret   # This Secret is empty
`)
    .example(
`
kind: Secret
metadata:
    name: my-secret
data: {}                          # Empty data or no data at all
`)
    .resolution(RESOLUTION_TEXT.populateEnvVarsData('Secret'))
    .resolution(RESOLUTION_TEXT.deleteEnvVarsSource('Secret'))
    
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')       

    
}