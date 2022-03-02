import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_INGRESS_SERVICE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_INGRESS_SERVICE)
    .category(ValidatorCategory.Networking)
    .title('Unresolved Service reference in Ingress')

    .description(
`Ingresses expose Kubernetes applications externally to the public.
Ingresses associate with Pods through references to Services.

This validator detects a condition when Ingresses are pointing to non-existing Services.
It usually indicates a naming error in the Ingress or Service.
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
            name: foo-service    # Service not found
            port:
              number: 80
`)    
    .example(
`
apiVersion: v1
kind: Service
metadata:
  name: bar-service              # Different name in Ingress
...
`)

    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Service'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('Service', 'Ingress'))
    .resolution(RESOLUTION_TEXT.typoNameReference('Service', 'Ingress'))
    .resolution(`
Make necessary naming corrections on the Ingress or the Service.
`)
    
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/ingress/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')
    
}