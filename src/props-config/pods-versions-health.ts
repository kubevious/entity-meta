export interface PodVersionsHealthInfo
{
    versions: PodVersionHealthInfo[];
}

export interface PodVersionHealthInfo
{
    launcher: {
        dn: string,
        title: string,
        date: string
    }
    pods: PodHealthInfo[];
}

export interface PodHealthInfo
{
    dn: string;
    phase: string;
}