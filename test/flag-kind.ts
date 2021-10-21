import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { FlagKind } from '../src';

describe('flag-kind', function() {

    it('case-01', function() {
        
        for(const key in FlagKind)
        {
            should(key).be.a.String();

            const value = (<any>FlagKind)[key];
            should(value).be.a.String();

            should(key).be.equal(value, "FlagKind enum keys and values should be identical.");
        }
    });

});