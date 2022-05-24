import { ValidatorID as ID } from '../../../../validator-id'
import { ValidatorsDocsBuilder } from '../../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../../categories';
import { RESOLUTION_TEXT } from '../../texts';

export function setupTRAEFIK_UNUSED_SERVICE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.TRAEFIK_UNUSED_SERVICE)
    .category(ValidatorCategory.Traefik)
    .title('Unused Traefik Service')
    .description(`
TraefikService is an abstraction on top of Kubernetes Services to enable advanced
routing such as weighted load balancing, mirroring and sticky sessions.

This validator detects when a TraefikService is not attached to IngressRoutes. 

That can be an indication of a typo in the TraefikService name or IngressRoutes reference.
`)

    .affected('TraefikService')
       
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
    - name: whoamiv2
      weight: 1
`)

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
      - kind: TraefikService
        name: weighted-svc      # TraefikService "weighted" not found
        port: 80
`)    

.resolution(`
Examine IngressRoutes within the namespace and determine if the TraefikService is supposed used in any of them.
`)
    .resolution(`
If the TraefikService is indeed unused, it may need to be just removed.
`)

    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroute')
    .externalLink('https://doc.traefik.io/traefik/routing/services/')
    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-traefikservice')

}