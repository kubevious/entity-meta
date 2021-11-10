import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { TOP_ROOTS, NodeKind } from '../src';

describe('top-roots', function() {

    it('case-01', function() {
        should(TOP_ROOTS[0].title).be.equal('Logic');
        should(TOP_ROOTS[0].dn).be.equal('root/logic');
        should(TOP_ROOTS[0].kind).be.equal(NodeKind.logic);

        should(TOP_ROOTS[0].subNodes).containEql(NodeKind.app)
        should(TOP_ROOTS[0].subNodes).not.containEql(NodeKind.k8s)
    });

});