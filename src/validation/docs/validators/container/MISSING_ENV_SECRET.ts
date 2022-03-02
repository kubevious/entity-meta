import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_ENV_SECRET(builder: ValidatorsDocsBuilder) {
   
    builder
    .validator(ID.MISSING_ENV_SECRET)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.EnvironmentVariables)
    .title('Unresolved Secret reference in container environment variables')
    .description(
`You can use Secrets as values for container environment variables.
This validator detects a condition when a Secret used as a source for 
environment variables in the container spec is not found.
That can happen if the Secret
was deleted or renamed, or there was a typo in the envFrom.secretRef.
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
                secretKeyRef:
                  name: my-secret  # This Secret is not present
                  key: key-in-my-secret
                  optional: false
          envFrom:
            - secretRef:
                name: my-other-secret # This Secret is not present
                optional: false
`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Secret'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('Secret', 'Pod'))
    .resolution(RESOLUTION_TEXT.typoNameReference('Secret', 'container environment variables spec'))
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')


}