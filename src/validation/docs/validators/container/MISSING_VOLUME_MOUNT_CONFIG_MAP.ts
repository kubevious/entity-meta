import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupMISSING_VOLUME_MOUNT_CONFIG_MAP(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.MISSING_VOLUME_MOUNT_CONFIG_MAP)
    .category(ValidatorCategory.Container)
    .subCategory(ValidatorSubCategory.VolumeMount)
    .title('Unresolved ConfigMap reference in container volume mount')
    .description(
`You can mount ConfigMaps to Pods as volumes.
This validator detects a condition when a ConfigMap mounted as a
volume in PodTemplateSpec is not found. That can happen if the ConfigMap
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
        - name: my-config-volume
          configMap:
            name: my-config-map # This ConfigMap is not present
            optional: false
`)
    .resolution(RESOLUTION_TEXT.checkPresentInSameNamespace('ConfigMap'))
    .resolution(RESOLUTION_TEXT.checkInDifferentNamespace('ConfigMap', 'Pod'))
    .resolution(RESOLUTION_TEXT.typoNameReference('ConfigMap', 'volume spec'))
    
    .externalLink('https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/volume/#projections')

}