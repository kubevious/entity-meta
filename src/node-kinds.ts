import _ from 'the-lodash';
import { NodeKind } from './entities/node-kind';

export const NODE_KINDS = _.map(NodeKind, x => <NodeKind>x);