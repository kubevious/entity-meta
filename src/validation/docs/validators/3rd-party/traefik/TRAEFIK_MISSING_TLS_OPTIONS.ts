import { ValidatorID as ID } from '../../../../validator-id'
import { ValidatorsDocsBuilder } from '../../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../../categories';
import { RESOLUTION_TEXT } from '../../texts';

export function setupTRAEFIK_MISSING_TLS_OPTIONS(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.TRAEFIK_MISSING_TLS_OPTIONS)
    .category(ValidatorCategory.Traefik)
    .title('Missing Traefik TLSOptions reference in IngressRoute')

    .description(
`
Traefik TLSOptions are used to configure Traefik Proxy TLS connection parameters. TLSOptions are referenced from IngressRoute.

This validator detects a condition when the TLSOptions referenced in the IngressRoute is not found.
`)
    .affected('IngressRoute')   
    
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
      domains:
      - main: demo.kubevious.io
        sans:
        - demo.kubevious.io
      options:
        name: foo                               # TLSOptions not found in the namespace "samples"
        namespace: samples
`)   

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

    .resolution(`Check if the TLSOptions is present in the same namespace.`)
    .resolution(`Check if the TLSOptions is present in the namespace specified by the namespace field.`)
    .resolution(RESOLUTION_TEXT.typoNameReference('TLSOptions', 'IngressRoute'))

    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroute')
    .externalLink('https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-tlsoption')
    .externalLink('https://doc.traefik.io/traefik/https/tls/#tls-options')

    
}