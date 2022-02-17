import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { ValidatorID,
         ValidationConfig,
         ValidatorSetting,
         DEFAULT_VALIDATION_CONFIG,
         VALIDATOR_IDs } from '../src';


describe('validators', function() {

    
    it('enum', function() {
        for(const key in ValidatorID)
        {
            should(key).be.a.String();
    
            const value = (<any>ValidatorID)[key];
            should(value).be.a.String();
    
            should(key).be.equal(value, "ValidatorID enum keys and values should be identical.");
        }
    });

    it('default-01', function() {
        for(const key of VALIDATOR_IDs)
        {
            const defaultValue = DEFAULT_VALIDATION_CONFIG[key];
            should(defaultValue).be.a.String();
        }
    });


    it('default-02', function() {
        for(const key in ValidatorID)
        {
            const defaultValue = DEFAULT_VALIDATION_CONFIG[<ValidatorID>key];
            should(defaultValue).be.a.String();
        }
    });

});