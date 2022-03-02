import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupSERVICE_MISSING_PORT(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.SERVICE_MISSING_PORT)
    .category(ValidatorCategory.Networking)
    .title('Service port not found in Application')

    .description(
`Services connect Kubernetes applications.
Label selectors are used to associate Pods with Services.

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
    foo: bar  
  ports:
    - name: web
      port: 80
      protocol: TCP
      targetPort: 3000     # pointing to port 3000 but app exposes port 4000
`)
.example(`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    foo: bar
spec:
  containers:
  - name: worker
    image: nginx
    ports:
    - containerPort: 4000  # exposing port 4000 but Service points to 3000
`)

    .resolution(`
Identify which port is exposed in the app and make correction to the Service targetPort.
`)
    
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/')
    
}