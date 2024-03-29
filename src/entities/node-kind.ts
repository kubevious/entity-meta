export enum NodeKind
{
    root = 'root',

    k8s = 'k8s',
    cluster = 'cluster',
    api = 'api',
    version = 'version',
    kind = 'kind',
    resource = 'resource',

    logic = 'logic',
    ns = 'ns',
    app = 'app',
    cont = 'cont',
    initcont = 'initcont',
    // sidecont = 'sidecont',
    vols = 'vols',
    vol = 'vol',
    mounts = 'mounts',
    mount = 'mount',
    configmap = 'configmap',
    secret = 'secret',
    hpa = 'hpa',
    port = 'port',
    svcaccnt = 'svcaccnt',
    rlbndg = 'rlbndg',
    crlbndg = 'crlbndg',
    rl = 'rl',
    crl = 'crl',
    pv = 'pv',
    pvc = 'pvc',
    psp = 'psp',
    netpols = 'netpols',
    netpol = 'netpol',
    service = 'service',
    ingress = 'ingress',
    image = 'image',

    launcher = 'launcher', // To Retire
    depl = 'depl',
    ss = 'ss',
    ds = 'ds',
    replicaset = 'replicaset',
    rc = 'rc',
    job = 'job',
    cronjob = 'cronjob',
    pod = 'pod',

    podtmpl = 'podtmpl',

    infra = 'infra',
    nodes = 'nodes',
    pool = 'pool',
    node = 'node',
    storage = 'storage',
    storclass = 'storclass',

    images = 'images',
    repo = 'repo',
    tag = 'tag',

    gateway = 'gateway',
    domain = 'domain',
    url = 'url',

    pack = 'pack',
    helm = 'helm',

    rbac = 'rbac',
    user = 'user',
    group = 'group',

    summary = 'summary',

    rule_engine = 'rule_engine',
    rule = 'rule',
    rule_items = 'rule_items',
    rule_logs = 'rule_logs',


    /* Traefik */
    traefik_ingress_route = 'traefik_ingress_route',
    traefik_service = 'traefik_service',
    traefik_middleware = 'traefik_middleware',
    traefik_tls_opts = 'traefik_tls_opts',
}