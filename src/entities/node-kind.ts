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
    configMap = 'configMap',
    replicaSet = 'replicaSet',
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
    pod = 'pod',
    ingress = 'ingress',
    launcher = 'launcher',
    image = 'image',

    infra = 'infra',
    nodes = 'nodes',
    pool = 'pool',
    node = 'node',
    storage = 'storage',
    storclass = 'storclass',

    images = 'images',
    repo = 'repo',
    tag = 'tag',
}