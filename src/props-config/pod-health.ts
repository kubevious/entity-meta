import { HistogramBucket } from "./histogram-bucket";

export interface PodHealthConfig
{
    restarts: HistogramBucket;
}