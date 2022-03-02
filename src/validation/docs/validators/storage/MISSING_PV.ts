import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_PV(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_PV)
    .category(ValidatorCategory.Storage)
    .title('Unresolved PersistentVolume reference in the volume claim')

    .description(
`An existing PersistentVolume can be bound to PersistentVolumeClaim using volumeName property.

This validator detects a condition when a PersistentVolume referenced in
PersistentVolumeClaim is not found.
`)
    .affected('PersistentVolumeClaim')
    .example(`
apiVersion: v1
kind: PersistentVolumeClaim
spec:
  resources:
    requests:
      storage: 8Gi
  volumeMode: Filesystem
  volumeName: pvc-00000000-0000-0000-0000-000000000000   # PV not found 
  accessModes:
    - ReadWriteOnce
  storageClassName: gp2
`)

    .resolution('Check if the PersistentVolume exists.')
    .resolution('Make correction in PersistentVolumeClaim.')
    .resolution(`
It is possible that the PersistentVolume was deleted and cannot be recovered.
In such a case, the volumeName property should be removed from the PersistentVolumeClaim,
allowing the control plane to create a new PV.`)

    .externalLink('https://kubernetes.io/docs/concepts/storage/persistent-volumes/')
    .externalLink('https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reserving-a-persistentvolume')
    .externalLink('https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding')

}