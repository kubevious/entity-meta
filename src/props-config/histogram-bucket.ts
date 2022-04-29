export interface HistogramBucket
{
    [BucketKeys.BUCKET_15_MINS]: number;
    [BucketKeys.BUCKET_1_HR]: number;
    [BucketKeys.BUCKET_8_HRS]: number;
    [BucketKeys.BUCKET_1_DAY]: number;
    [BucketKeys.BUCKET_TOTAL]: number;
}

export enum BucketKeys {
    BUCKET_15_MINS = "15min",
    BUCKET_1_HR = "1hr",
    BUCKET_8_HRS = "8hr",
    BUCKET_1_DAY = "1day",
    BUCKET_TOTAL = "total",
}
