export interface K8sApiResourceStatusConfig
{
    config: {
        resources: K8sApiResourceStatus[]
    }
}

export interface K8sApiResourceStatus
{
    apiVersion: string;
    apiName: string | null;
    version: string;
    kindName: string;

    isNamespaced: boolean;

    verbs: string[];
    
    isDisabled?: boolean;
    isSkipped?: boolean;
    isDisconnected?: boolean;

    error?: K8sApiResourceError;
}


export interface K8sApiResourceError
{
    code?: number;
    message?: string;
}
