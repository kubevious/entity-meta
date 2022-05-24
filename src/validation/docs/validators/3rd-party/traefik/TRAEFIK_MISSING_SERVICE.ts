import { ValidatorID as ID } from '../../../../validator-id'
import { ValidatorsDocsBuilder } from '../../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../../categories';
import { RESOLUTION_TEXT } from '../../texts';

export function setupTRAEFIK_MISSING_SERVICE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.TRAEFIK_MISSING_SERVICE)
    .category(ValidatorCategory.Traefik)
    .title('Missing Traefik Service reference in IngressRoute or TraefikService')
     
    .description(
`IngressRoutes expose Kubernetes applications externally to the public.
Ingresses associate with Pods through references to Services.

TraefikService is an abstraction on top of Kubernetes Services to enable advanced
routing such as weighted load balancing, mirroring and sticky sessions.

This validator detects a condition when IngressRoutes or TraefikServices are pointing
to non-existing Services. It usually indicates a naming error in the IngressRoutes, TraefikServices or Services.
`)
    .affected('IngressRoute')
    .affected('TraefikService')

    .example(`
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
    name: whoami
spec:
    entryPoints:
    - web
    routes:
    - kind: Rule
      match: Host(\`demo.kubevious.io\`)
      services:
      - kind: Service
        name: foo               # K8s Service "foo" not found
        port: 80
      - kind: TraefikService
        name: weighted          # TraefikService "weighted" not found
        port: 80
`)    

    .example(`
apiVersion: v1
kind: Service
metadata:
  name: bar                     # Different name in IngressRoute
...
`)

    .example(`
apiVersion: traefik.containo.us/v1alpha1
kind: TraefikService
metadata:
    name: weighted              # Different name in IngressRoute
spec:
  weighted:
    services:
    - name: whoamiv1
      port: 80
      weight: 3
    - name: whoamiv2            # Missing Service whoamiv2
      port: 80
      weight: 1
`)

    .example(`
apiVersion: v1
kind: Service
metadata:
    name: whoamiv1              
...
`)

    .example(`
apiVersion: v1
kind: Service
metadata:
    name: whoamiv3              # Different name in TraefikService
...
`)

    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Service'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('Service', 'IngressRoute'))
    .resolution(RESOLUTION_TEXT.typoNameReference('Service', 'IngressRoute'))
    .resolution(`
Make necessary naming corrections on the IngressRoute, TraefikService or the Service.
`)

    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroute')
    .externalLink('https://doc.traefik.io/traefik/routing/services/')
    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-traefikservice')
    .externalLink('https://kubernetes.io/docs/concepts/services-networking/service/')


}