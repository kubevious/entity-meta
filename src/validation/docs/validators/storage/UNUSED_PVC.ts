import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupUNUSED_PVC(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.UNUSED_PVC)
    .category(ValidatorCategory.Storage)
    .title('PersistentVolumeClaim not attached')

    .description(
`PersistentVolumeClaims allow mounting permanent storage volumes to workloads.

This validator detects a condition when a PersistentVolumeClaim is not used or
referenced from workloads.
`)
    .affectedAllWorkloads()
    .example(`
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-minio                     # This PVC is not used
...
`)

    .resolution('Check if the workloads were removed, and the PVC should also be deleted.')
    .resolutionAndExample(
'Check if there was a typo in the workload volume spec.',
`kind: Deployment
spec:
  template:
    spec:
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: test-minio    # Fix the claimName
...
`)

    .externalLink('https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/')
    .externalLink('https://kubernetes.io/docs/concepts/storage/persistent-volumes/')

    
}