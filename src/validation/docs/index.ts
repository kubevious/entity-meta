import _ from 'the-lodash';
import { ValidatorID, VALIDATOR_IDs } from '../validator-id';
import { ValidatorDocs } from './builder';
import { ValidatorCategory } from './categories';
import { builder } from './validators';
import { VALIDATOR_CATEGORIES } from './categories';

export class ValidatorsMetaFacade
{
    private _categories: ValidatorCategoryMetaData[] = [];
    private _categoryDict: Record<string, ValidatorCategoryMetaData> = {};

    constructor()
    {
        for(const categoryInfo of VALIDATOR_CATEGORIES)
        {
            if (!this._categoryDict[categoryInfo.id])
            {
                const categoryData : ValidatorCategoryMetaData = {
                    categoryId: categoryInfo.id,
                    category: categoryInfo.name,
                    validators: []
                }
                this._categoryDict[categoryInfo.id.toString()] = categoryData;
                this._categories.push(categoryData);
            }
        }

        for(const validatorId of VALIDATOR_IDs)
        {
            const validatorDocs = this.getValidatorDocs(validatorId);
            const categoryData = this._categoryDict[validatorDocs.category.toString()];
            if (categoryData)
            {
                categoryData.validators.push(validatorDocs);
            }
        }

        for(const categoryData of this._categories)
        {
            categoryData.validators = _.orderBy(categoryData.validators, x => x.subCategory);
        }
    }

    get categories() {
        return this._categories;
    }

    getValidatorDocs(id: ValidatorID) : ValidatorDocs
    {
        return builder.get(id);
    }
}

export interface ValidatorCategoryMetaData
{
    categoryId: ValidatorCategory,
    category: string,

    validators: ValidatorDocs[]
}

export const VALIDATORS_METADATA = new ValidatorsMetaFacade();