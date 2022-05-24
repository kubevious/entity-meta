import { ValidatorID as ID } from '../../../../validator-id'
import { ValidatorsDocsBuilder } from '../../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../../categories';
import { RESOLUTION_TEXT } from '../../texts';

export function setupTRAEFIK_UNUSED_TLS_OPTIONS(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.TRAEFIK_UNUSED_TLS_OPTIONS)
    .category(ValidatorCategory.Traefik)
    .title('Unused Traefik TLSOptions')
    .description(
`
Traefik TLSOptions are used to configure Traefik Proxy TLS connection parameters. TLSOptions are referenced from IngressRoute.

This validator detects when a TLSOptions is not attached to IngressRoutes. 

That can be an indication of a typo in the TLSOptions name, namespace or IngressRoutes reference.
`)

    .affected('TLSOptions')


    .example(`
apiVersion: traefik.containo.us/v1alpha1
kind: TLSOption
metadata:
  name: bar                                     # Different name in IngressRoute
  namespace: samples
spec:
  cipherSuites:
  - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  - TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  - TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305
  - TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
  - TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305
  - TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305
  - TLS_AES_256_GCM_SHA384
  - TLS_AES_128_GCM_SHA256
  - TLS_CHACHA20_POLY1305_SHA256
  - TLS_FALLBACK_SCSV
  curvePreferences:
  - CurveP521
  - CurveP384
  minVersion: VersionTLS12
  sniStrict: true
`)

    .example(`
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: whoami
spec:
  entryPoints:
  - websecure
  routes:
  - kind: Rule
    match: Host(\`demo.kubevious.io\`)
    services:
    - kind: Service
      name: whoami-svc
      port: 80
    tls:
      certResolver: le
      options:
        name: foo                               # TLSOptions not found in the namespace "samples"
        namespace: samples
`)   

    .resolution(`
Examine IngressRoutes within the namespace and determine if the TLSOptions is supposed used in any of them.`)
    .resolution(`
Examine cross-namespace references in IngressRoutes and see if any of them should refer to this TLSOptions.
`)
    .resolution(`
If the TLSOptions is indeed unused, it may need to be just removed.
`)

    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroute')
    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-tlsoption')
    .externalLink('https://doc.traefik.io/traefik/https/tls/#tls-options')

        
}