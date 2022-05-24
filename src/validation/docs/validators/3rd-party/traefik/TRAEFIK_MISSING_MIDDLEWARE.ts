import { ValidatorID as ID } from '../../../../validator-id'
import { ValidatorsDocsBuilder } from '../../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../../categories';
import { RESOLUTION_TEXT } from '../../texts';

export function setupTRAEFIK_MISSING_MIDDLEWARE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.TRAEFIK_MISSING_MIDDLEWARE)
    .category(ValidatorCategory.Traefik)
    .title('Missing Traefik Middleware reference in IngressRoute')
    .description(
`
Traefik Middlewares are used to customize the API Gateway behavior. Middlewares are referenced from IngressRoute.

This validator detects a condition when the Middleware referenced in the IngressRoute is not found.
`)
    .affected('IngressRoute')   
    
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
    - name: samples-security@kubernetescrd   # Middleware not found in the namespace "samples"
      namespace: samples
    - name: redirect                         # Middleware not found in same namespace
    services:
    - kind: Service
      name: whoami-svc
      port: 80
`)   

    .example(`
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: redirect
spec:
  redirectScheme:
    permanent: true
    scheme: https
`)   

    .resolution(`Check if the Middleware is present in the same namespace.`)
    .resolution(`Check if the Middleware is present in the namespace specified by the namespace field.`)
    .resolution(RESOLUTION_TEXT.typoNameReference('Middleware', 'IngressRoute'))

    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroute')
    .externalLink('https://doc.traefik.io/traefik/v2.0/middlewares/overview/')

}