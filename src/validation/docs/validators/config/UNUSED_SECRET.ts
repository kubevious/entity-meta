import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory } from '../../categories';

export function setupUNUSED_SECRET(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_SECRET)
    .category(ValidatorCategory.Configuration)
    .title('Unused Secret')

    .description(
`Secrets are used to store sensitive data. Secrets can be used in containers 
as environment variables or mounted as volumes. Secrets are also used in 
ServiceAccounts to store the token when accessing Kubernetes API Server.

This validator detects when a Secret is not mounted to a volume, not used as 
container environment variables and not used in any ServiceAccounts. 

That can be an indication of a typo in a Secret name or Secret references in
volume mount, projections, environment variables or ServiceAccounts.
`)
    .affected('Secret')
    .example(`
apiVersion: v1
kind: Secret
metadata:
  name: secret-foo                      # This Secret is not used elsewhere
data:
  my-key: bXktdmFsdWU=
`)
    .example(`
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
                  name: secret-foo-1    # This Secret is not present
                  key: my-key
          envFrom:
            - secretRef:
                name: secret-foo-2      # This Secret is not present
`)
.example(`
kind: Deployment
spec:
  template:
    spec:
      volumes:
        - name: my-secret-volume
          secret:
            name: secret-bar            # This Secret is not present
`)

    .resolution(`
Examine applications within the namespace and determine if the Secret is supposed to
be mounted to the file system, used as environment variables or used in ServiceAccounts.`)
    .resolution(`
If the Secret is supposed to be used in volume maps, either correct the Secret name or
the reference name.
`)
    .resolution(`
If the Secret is indeed unused, it may need to be just removed.
`)
.resolution(`
There is a possible false positive trigger for this validator.
A Secret can be used by other third-party apps or using direct Kubernetes APIs.
Such a condition cannot be detected using in Kubevious, so in such a case,
this validator can be turned off or warning just ignored.
`)

    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/volume/#projections')
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')
    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/')

}