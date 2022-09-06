import { K8sApiResourceStatusConfig, K8sApiResourceStatus } from '../props-config/api-server';

export class K8sApiResourceStatusLoader
{
    private _apiDict : { [apiVersion: string] : { [kind: string] : K8sApiResourceStatus }} = {};
    
    constructor(config: K8sApiResourceStatusConfig)
    {
        if (!config) {
            throw new Error("[K8sApiResourceStatusLoader] Missing ApiResourceStatus");
            return;
        }

        const apiResources = config.config?.resources as K8sApiResourceStatus[];
        if (!apiResources) {
            throw new Error("[K8sApiResourceStatusLoader] Empty ApiResourceStatus resources");
            return;
        }

        for(const apiResource of apiResources)
        {
            if (!this._apiDict[apiResource.apiVersion]) {
                this._apiDict[apiResource.apiVersion] = {};
            }
            this._apiDict[apiResource.apiVersion][apiResource.kindName] = apiResource;
        }
    }

    getByApiVersionAndKind(apiVersion: string, kind: string) : K8sApiResourceStatus | null
    {
        const kindsDict = this._apiDict[apiVersion];
        if (kindsDict)
        {
            const apiResource = kindsDict[kind];
            if (apiResource)
            {
                return apiResource;
            }
        }

        return null;
    }

    getByApiAndVersionAndKind(api: string | null, version: string, kind: string) : K8sApiResourceStatus | null
    {
        const apiVersion = api ? `${api}/${version}` : version;
        return this.getByApiVersionAndKind(apiVersion, kind);
    }

}