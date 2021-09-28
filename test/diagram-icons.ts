import 'mocha';
import should = require('should');

import { DIAGRAM_ICONS } from '../src';

describe('diagram-icons', function() {

    it('k8s-kind-01', function() {
        const dn = "root/k8s/cluster/api-[rbac.authorization.k8s.io]/version-[v1]/kind-[ClusterRole]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/c-role.svg');
    });

    it('k8s-kind-02', function() {
        const dn = "root/k8s/cluster/version-[v1]/kind-[PersistentVolume]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/pv.svg');
    });

    it('k8s-kind-03', function() {
        const dn = "root/k8s/ns-[book]/version-[v1]/kind-[ConfigMap]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/cm.svg');
    });

    it('k8s-kind-04', function() {
        const dn = "root/k8s/ns-[book]/api-[apps]/version-[v1]/kind-[Deployment]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/deploy.svg');
    });

    it('k8s-resource-01', function() {
        const dn = "root/k8s/cluster/api-[rbac.authorization.k8s.io]/version-[v1]/kind-[ClusterRole]/resource-[abcd]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/c-role.svg');
    });

    it('k8s-resource-02', function() {
        const dn = "root/k8s/cluster/version-[v1]/kind-[PersistentVolume]/resource-[abcd]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/pv.svg');
    });

    it('k8s-resource-03', function() {
        const dn = "root/k8s/ns-[book]/version-[v1]/kind-[ConfigMap]/resource-[abcd]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/cm.svg');
    });

    it('k8s-resource-04', function() {
        const dn = "root/k8s/ns-[book]/api-[apps]/version-[v1]/kind-[Deployment]/resource-[abcd]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/deploy.svg');
    });

    it('k8s-resource-05', function() {
        const dn = "root/k8s/ns-[book]/api-[apps]/version-[v1]/kind-[abcd]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/unknown.svg');
    });


    it('logic-01', function() {
        const dn = "root/logic/ns-[gitlab]/app-[gitlab-cert-manager-webhook]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/logic/app.svg');
    });

    it('logic-02', function() {
        const dn = "root/logic/ns-[gitlab]/app-[gitlab-cert-manager-webhook]/cont-[certmanager]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/logic/cont.svg');
    });

    it('logic-03', function() {
        const dn = "root/logic/ns-[gitlab]/app-[gitlab-cert-manager-webhook]/launcher-[Deployment]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/deploy.svg');
    });

    it('logic-04', function() {
        const dn = "root/logic/ns-[gitlab]/app-[gitlab-cert-manager-webhook]/launcher-[DaemonSet]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/k8s/ds.svg');
    });

    it('logic-05', function() {
        const dn = "root/logic/ns-[gitlab]/app-[gitlab-cert-manager-webhook]/launcher-[zzz]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/logic/launcher.svg');
    });

    it('images-01', function() {
        const dn = "root/images/repo-[dockerhub]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/images/repository.svg');
    });

    it('images-02', function() {
        const dn = "root/images/repo-[dockerhub]/image-[busybox]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/logic/image.svg');
    });

    it('images-03', function() {
        const dn = "root/images/repo-[dockerhub]/image-[busybox]/tag-[latest]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/images/tag.svg');
    });


    it('infra-01', function() {
        const dn = "root/infra/nodes/pool-[pool-2]";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/infra/pool.svg');
    });


    it('infra-01', function() {
        const dn = "root/infra/xxx/yyy";
        const result = DIAGRAM_ICONS.get(dn);
        should(result).be.equal('/img/entities/unknown.svg');
    });

    
});