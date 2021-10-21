import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { PropsId, PROPS_TITLES } from '../src';

describe('props-titles', function() {

    it('case-01', function() {
   
        should(PROPS_TITLES.get(PropsId.config)).be.equal('Config');
        
    });

});