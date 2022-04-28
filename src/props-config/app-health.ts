import { HistogramBucket } from "./histogram-bucket";

export interface WorkloadHealthConfig
{
    pods: WorkloadHealthMetric;
    pending: WorkloadHealthMetric;
    running: WorkloadHealthMetric;
    succeeded: WorkloadHealthMetric;
    failed: WorkloadHealthMetric;
    unknown: WorkloadHealthMetric;

    /* running phase */
    scheduling: WorkloadHealthMetric;
    initializing: WorkloadHealthMetric;
    waitingContainersReady: WorkloadHealthMetric;
    waitingConditions: WorkloadHealthMetric;
    waitingReady: WorkloadHealthMetric;
    ready: WorkloadHealthMetric;

    restartedPods: HistogramBucket;
}


export interface WorkloadHealthMetric
{
    count: number,
    perc: number
}