import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { NodeKind } from '../src';

describe('node-kind', function() {

    it('case-01', function() {
        
        for(const key in NodeKind)
        {
            should(key).be.a.String();

            const value = (<any>NodeKind)[key];
            should(value).be.a.String();

            should(key).be.equal(value, "NodeKind enum keys and values should be identical.");
        }
    });

});