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
    runStage: string;
    conditions: PodHealthCondition[];
}

export interface PodHealthCondition
{
    type: string;
    state: boolean;
}


export enum PodPhase {
    Pending = "Pending",
    Running = "Running",
    Succeeded = "Succeeded",
    Failed = "Failed",
    Unknown = "Unknown",
}

export enum PodRunStage {
    Scheduling = "Scheduling",
    Initializing = "Initializing",
    WaitingContainers = "WaitingContainers",
    WaitingConditions = "WaitingConditions",
    WaitingReady = "WaitingReady",
    Ready = "Ready"
}