import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { PropsId, PROPS_ORDER } from '../src';

describe('props-order', function() {

    it('case-01', function() {
   
        should(PROPS_ORDER.get(PropsId.targetLinks)).be.equal(10);
        should(PROPS_ORDER.get(PropsId.properties)).be.equal(40);
        should(PROPS_ORDER.get(PropsId.config)).be.equal(700);
        
    });

});