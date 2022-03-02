import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupINGRESS_NOT_MOUNT_TO_APPS(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.INGRESS_NOT_MOUNT_TO_APPS)
    .category(ValidatorCategory.Networking)
    .title('No Application exposed by Ingress')

    .description(
`Ingresses expose Kubernetes applications externally to the public.
Ingresses associate with Pods through references to Services.

This validator detects a condition when Ingresses are not exposing any application.
It can happen if the Ingress rules spec is empty, Services are unresolved, or 
the Services referenced in the Ingress do not reference an application.
`)
    .affected('Ingress')

    .example(`
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-service
            port:
              number: 80
`)    
    .example(
`
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: ClusterIP
  selector:
    app: non-existing-app-label  # There are no apps with such label
...
`)

    .resolution(`
Identify which Service the Ingress should refer to.`)
    .resolution(`
Inspect Services definitions and ensure that corresponding applications
referenced in the label selector are present.
`)
    
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/ingress/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/')

}