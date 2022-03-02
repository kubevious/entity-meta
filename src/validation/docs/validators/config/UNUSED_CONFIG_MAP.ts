import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNUSED_CONFIG_MAP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_CONFIG_MAP)
    .category(ValidatorCategory.Configuration)
    .title('Unused ConfigMap')

    .description(
`One of the most common uses of ConfigMap is to mount it to a container
file system or use it as environment variables.

This validator detects when a ConfigMap is not mounted to a volume and not used as 
container environment variables. 

That can be an indication of a typo in a ConfigMap name or ConfigMap references in
volume mount, projections, or environment variables.
`)
    .affected('ConfigMap')
    .example(`
apiVersion: v1
kind: ConfigMap
metadata:
  name: config-foo                      # This ConfigMap is not used elsewhere
data:
  my-key: my-value
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
                configMapKeyRef:
                  name: config-foo-1    # This ConfigMap is not present
                  key: my-key
          envFrom:
            - configMapRef:
                name: config-foo-2      # This ConfigMap is not present
`)
.example(`
kind: Deployment
spec:
  template:
    spec:
      volumes:
        - name: my-config-volume
          configMap:
            name: config-bar            # This ConfigMap is not present
`)

    .resolution(`
Examine applications within the namespace and determine if the ConfigMap is supposed to
be mounted to the file system or used as environment variables.`)
    .resolution(`
If the ConfigMap is supposed to be used in volume maps, either correct the ConfigMap name or
the reference name.
`)
    .resolution(`
If the ConfigMap is indeed unused, it may need to be just removed.
`)
.resolution(`
There is a possible false positive trigger for this validator.
A ConfigMap can be used by other third-party apps or using direct Kubernetes APIs.
Such a condition cannot be detected using in Kubevious, so in such a case,
this validator can be turned off or warning just ignored.
`)

    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/volume/#projections')
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#environment-variables')

}