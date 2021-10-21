import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { PropsId } from '../src';
import { camelToHyphenSnake } from '../src/utils';

describe('props-id', function() {

    it('case-01', function() {
        
        for(const key in PropsId)
        {
            should(key).be.a.String();

            const value = (<any>PropsId)[key];
            should(value).be.a.String();

            const convertedKey = camelToHyphenSnake(key);

            should(convertedKey).be.equal(value, "PropsId enum keys and values should be identical.");
        }
    });

});