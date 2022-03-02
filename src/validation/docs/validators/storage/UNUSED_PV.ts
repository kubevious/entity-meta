import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNUSED_PV(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_PV)
    .category(ValidatorCategory.Storage)
    .title('PersistentVolume not attached')

    .description(
`
This validator detects a condition when a PersistentVolume is not used or
referenced from PersistentVolumeClaim.
`)
    .affectedAllWorkloads()
    .example(`
apiVersion: v1
kind: PersistentVolume
metadata:
name: pvc-00000000-0000-0000-0000-000000000000     # This PV is not used
...
`)

    .resolution('Check if the workloads and PVCs were removed, and if this persistent volume should be deleted.')
    .resolutionAndExample(
'If the volume should be in use, it can be bound the PersistentVolumeClaim',
`
apiVersion: v1
kind: PersistentVolumeClaim
spec:
  resources:
    requests:
      storage: 8Gi
  volumeMode: Filesystem
  volumeName: pvc-00000000-0000-0000-0000-000000000000   # Reference here 
  accessModes:
    - ReadWriteOnce
  storageClassName: gp2
`)

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/')
    .externalLink('https://kubernetes.io/docs/concepts/storage/persistent-volumes/')

}