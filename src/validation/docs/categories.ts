export enum ValidatorCategory
{
    ApiServer = 'ApiServer',
    RBAC = 'RBAC',
    Security = 'Security',
    Container = 'Container',
    Storage = 'Storage',
    Compute = 'Compute',
    Networking = 'Networking',
    Configuration = 'Configuration',
    Misc = 'Misc'
}

export enum ValidatorSubCategory
{
    VolumeMount = 'VolumeMount',
    EnvironmentVariables = 'EnvironmentVariables',

    Controller = 'Controller',
    Scale = 'Scale',
    Status = 'Status',

    Misc = 'Misc',
}

export interface ValidatorCategoryInfo
{
    id: ValidatorCategory;
    name: string;
}

export const VALIDATOR_CATEGORIES : ValidatorCategoryInfo[] = [
    {
        id: ValidatorCategory.Container,
        name: 'Container'
    },
    {
        id: ValidatorCategory.Compute,
        name: 'Compute'
    },
    {
        id: ValidatorCategory.Configuration,
        name: 'Configuration'
    },
    {
        id: ValidatorCategory.Networking,
        name: 'Networking'
    },
    {
        id: ValidatorCategory.Storage,
        name: 'Storage'
    },
    {
        id: ValidatorCategory.RBAC,
        name: 'RBAC'
    },
    {
        id: ValidatorCategory.Security,
        name: 'Security'
    },
    {
        id: ValidatorCategory.ApiServer,
        name: 'Kubernetes API Server'
    },
    {
        id: ValidatorCategory.Misc,
        name: 'Miscellaneous'
    },
]