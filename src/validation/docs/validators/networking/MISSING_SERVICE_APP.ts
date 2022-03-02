import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_SERVICE_APP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_SERVICE_APP)
    .category(ValidatorCategory.Networking)
    .title('Unresolved Application reference in Service')

    .description(
`Services connect Kubernetes applications.
Label selectors are used to associating Pods with Services.

This validator detects a condition when no application is associated with a Service.
It usually indicates a naming error in workload or Service labels.
`)
    .affected('Service')
    .example(`
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: ClusterIP
  selector:
    foo: bar                # label-value not found
`)
.example(`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    foo: not-bar            # different in the Service
`)

    .resolution(`
Identify which application should the Service refer to.`)
    .resolution(`
Make correction to the labels on the workload or the Service.
`)
    
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/')
    
}