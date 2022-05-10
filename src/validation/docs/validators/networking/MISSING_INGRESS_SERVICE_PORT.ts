import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory } from '../../categories';

export function setupMISSING_INGRESS_SERVICE_PORT(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_INGRESS_SERVICE_PORT)
    .category(ValidatorCategory.Networking)
    .title('Unresolved Service Port reference in Ingress')

    .description(
`Ingresses expose Kubernetes applications externally to the public.
Ingresses associate with Pods through references to Services.

This validator detects a condition when Ingresses are pointing to non-existing Port of the Service.
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
            name: foo-service
            port:
              number: 80    # Port 80 not present in the Service
`)    
    .example(
`
apiVersion: v1
kind: Service
metadata:
  name: foo-service             
spec:
  ports:
  - port: 9000              # Different port used in Ingress
    protocol: TCP
    targetPort: http  
...
`)

    .resolution('Inspect both Service and Ingress manifests')
    .resolution(`
Make necessary corrections on port specifications of the Ingress or the Service.
`)
    
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/ingress/')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')
    
}