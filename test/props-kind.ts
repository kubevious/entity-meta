import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { PropsKind } from '../src';
import { camelToHyphenSnake } from '../src/utils';

describe('props-kind', function() {

    it('case-01', function() {
        
        for(let key in PropsKind)
        {
            should(key).be.a.String();

            const value = (<any>PropsKind)[key];
            should(value).be.a.String();

            const convertedKey = camelToHyphenSnake(key);

            should(convertedKey).be.equal(value, "PropsKind enum keys and values should be identical.");
        }
    });

});