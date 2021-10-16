export interface DiagramRoot {
    title: string,
    dn: string
}

export const TOP_ROOTS : DiagramRoot[] = [
    {
        title: 'Logic',
        dn: 'root/logic'
    },
    {
        title: 'Images',
        dn: 'root/images'
    },
    {
        title: 'Gateway',
        dn: 'root/gateway'
    },
    {
        title: 'Package',
        dn: 'root/pack'
    },
    {
        title: 'K8s',
        dn: 'root/k8s'
    },
    {
        title: 'Infra',
        dn: 'root/infra'
    },
];