import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { PropsKind, PROPS_TOOLTIPS } from '../src';

describe('props-tooltips', function() {

    it('case-01', function() {
   
        should(PROPS_TOOLTIPS.get(PropsKind.config)).be.equal('Kubernetes YAML Configuration');
        
    });

});