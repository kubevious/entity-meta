import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_PVC(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_PVC)
    .category(ValidatorCategory.Storage)
    .title('Unresolved PersistentVolumeClaim reference in container')

    .description(
`PersistentVolumeClaims allow mounting permanent storage volumes to workloads.

This validator detects a condition when a PersistentVolumeClaim referenced
from the workload is not found.
`)
    .affectedAllWorkloads()
    .example(`
kind: Deployment
spec:
  template:
    spec:
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: test-minio    # Missing PersistentVolumeClaim 
...
`)
    .example(`
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-minio                     # Different name
spec:
  storageClassName: ssd
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
`)

    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('PersistentVolumeClaim'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('PersistentVolumeClaim', 'workload'))
    .resolution(RESOLUTION_TEXT.typoNameReference('PersistentVolumeClaim', 'workload volume spec'))
    .resolution('Correct the persistentVolumeClaim in the workload volume spec.')

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/')
    .externalLink('https://kubernetes.io/docs/concepts/storage/persistent-volumes/')

    
}