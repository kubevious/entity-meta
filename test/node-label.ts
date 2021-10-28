import 'mocha';
import should = require('should');

import _ from 'the-lodash';

import { NODE_KINDS } from '../src';
import { NODE_LABELS } from '../src';
import { NODE_LABEL_TO_KIND } from '../src';

describe('diagram-label', function() {

    it('inverse-label', function() {

        for(const kind of NODE_KINDS)
        {
            {
                const resolvedKind = NODE_LABEL_TO_KIND.get(kind);
                should(resolvedKind).be.equal(kind);
            }
            {
                const label = NODE_LABELS.get(kind);
                const resolvedKind = NODE_LABEL_TO_KIND.get(label);
                should(resolvedKind).be.equal(kind);
            }
            
        }
    });

});