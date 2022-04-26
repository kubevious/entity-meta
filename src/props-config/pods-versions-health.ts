export interface PodVersionsHealthInfo
{
    versions: PodVersionHealthInfo[];
}

export interface PodVersionHealthInfo
{
    launcher: PodHealthLauncherInfo;
    pods: PodHealthInfo[];
}

export interface PodHealthLauncherInfo
{
    dn: string,
    title: string,
    date: string
}

export interface PodHealthInfo
{
    dn: string;
    date: string;
    phase: string;
}