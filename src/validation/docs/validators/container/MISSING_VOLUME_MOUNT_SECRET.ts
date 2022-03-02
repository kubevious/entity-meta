import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_VOLUME_MOUNT_SECRET(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_VOLUME_MOUNT_SECRET)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.VolumeMount)
    .title('Unresolved Secret reference in container volume mount')
    .description(
`You can mount Secrets to Pods as volumes.
This validator detects a condition when a Secret mounted as a
volume in PodTemplateSpec is not found. That can happen if the Secret
was deleted or renamed, or there was a typo in the volume mount spec.
Note that this check is skipped for volume mounts marked as optional.`)
    .affectedAllWorkloads()
    .example(
`
kind: Deployment
spec:
  template:
  spec:
    volumes:
      - name: my-secret-volume
        secret:
          secretName: my-secret # This Secret is not present
          optional: false
`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('Secret'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('Secret', 'Pod'))
    .resolution(RESOLUTION_TEXT.typoNameReference('Secret', 'volume spec'))
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/volume/#projections')

}