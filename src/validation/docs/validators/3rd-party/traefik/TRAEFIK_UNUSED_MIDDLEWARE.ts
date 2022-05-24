import { ValidatorID as ID } from '../../../../validator-id'
import { ValidatorsDocsBuilder } from '../../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../../categories';
import { RESOLUTION_TEXT } from '../../texts';

export function setupTRAEFIK_UNUSED_MIDDLEWARE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.TRAEFIK_UNUSED_MIDDLEWARE)
    .category(ValidatorCategory.Traefik)
    .title('Unused Traefik Middleware')
    .description(
`
Traefik Middlewares are used to customize the API Gateway behavior. Middlewares are referenced from IngressRoute.

This validator detects when a Middleware is not attached to IngressRoutes. 

That can be an indication of a typo in the Middleware name, namespace or IngressRoutes reference.
`)

    .affected('Middleware')

    .example(`
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: redirect                       # IngressRoute references "redirect-https" instead
spec:
  redirectScheme:
    permanent: true
    scheme: https
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
    middlewares:
    - name: redirect-https             # Middleware not found in same namespace
    services:
    - kind: Service
      name: whoami-svc
      port: 80
`)   

    .resolution(`
Examine IngressRoutes within the namespace and determine if the Middleware is supposed used in any of them.`)
    .resolution(`
Examine global references in IngressRoutes and see if any of them should refer to this Middleware using the "<namespace>-<middleware>@kubernetescrd" pattern.
`)
    .resolution(`
If the Middleware is indeed unused, it may need to be just removed.
`)

    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroute')
    .externalLink('https://doc.traefik.io/traefik/v2.0/middlewares/overview/')

}