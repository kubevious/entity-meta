import _ from 'the-lodash';
import { ValidatorID as ID } from '../validator-id';
import { ValidatorCategory, ValidatorSubCategory } from './categories';

export class ValidatorsDocsBuilder
{
    private _data : Record<string, ValidatorDocs> = {};

    validator(id: ID)
    {
        if (this._data[id]){
            throw new Error(`${id} is already present`);
        }
        this._data[id] = this._buildNewDocs(id);
        return new ValidatorDocsBuilder(this._data[id]);
    }

    get(id: ID) {
        if (this._data[id]){
            return this._data[id];
        }
        return this._buildNewDocs(id);
    }

    private _buildNewDocs(id: ID) : ValidatorDocs
    {
        return {
            validatorId: id,
            category: ValidatorCategory.Misc,
            subCategory: ValidatorSubCategory.Misc,
            title: `Validates ${id}`,
            affected: [],
            examples: [],
            resolutions: [],
            resolutionExamples: [],
            externalLinks: [],
        }
    }
}

export class ValidatorDocsBuilder
{
    private _data: ValidatorDocs;

    constructor(data: ValidatorDocs)
    {
        this._data = data;
    }

    category(value: ValidatorCategory)
    {
        this._data.category = value;
        return this;
    }

    subCategory(value: ValidatorSubCategory)
    {
        this._data.subCategory = value;
        return this;
    }

    title(value: string)
    {
        this._data.title = value;
        return this;
    }

    description(value: string)
    {
        this._data.description = value;
        return this;
    }

    externalLink(value: string)
    {
        this._data.externalLinks.push(value)
        return this;
    }

    example(value: string, language?: ValidatorExampleScriptLanguage)
    {
        const script = this._massageScript(value, language);
        this._data.examples.push(script);
        return this;
    }

    affected(value: string)
    {
        this._data.affected.push(value);
        return this;
    }

    affectedAllWorkloads()
    {
        return this
            .affected('Deployment')
            .affected('DaemonSet')
            .affected('StatefulSet')
            .affected('CronJob')
            .affected('Job')
            .affected('ReplicaSet')
            .affected('Pod');
    }

    resolution(value: string)
    {
        this._data.resolutions.push(value);
        return this;
    }

    resolutionExample(value: string, language?: ValidatorExampleScriptLanguage)
    {
        const script = this._massageScript(value, language);
        this._data.resolutionExamples.push(script);
        return this;
    }

    resolutionAndExample(text: string, script: string, language?: ValidatorExampleScriptLanguage)
    {
        this.resolution(text);
        this.resolutionExample(script, language);
        return this;
    }    

    private _massageScript(value: string, language?: ValidatorExampleScriptLanguage) : ValidatorExample
    {
        const script = _.trim(value, "\n\r");
        return {
            language: language ?? 'yaml',
            script: script,
        }
    }
}

export type ValidatorExampleScriptLanguage = 'javascript' | 'yaml' | 'json' | 'shell';
export interface ValidatorExample
{
    language: ValidatorExampleScriptLanguage;
    script: string;
}

export interface ValidatorDocs
{
    validatorId: ID,
    category: ValidatorCategory,
    subCategory: ValidatorSubCategory,
    title: string,
    description?: string,
    examples: ValidatorExample[],
    affected: string[],
    resolutions: string[],
    resolutionExamples: ValidatorExample[],
    externalLinks: string[],
}


