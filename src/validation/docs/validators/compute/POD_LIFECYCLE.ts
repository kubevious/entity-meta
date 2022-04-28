import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';

export function setupPOD_LIFECYCLE(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.POD_LIFECYCLE)
    .category(ValidatorCategory.Compute)
    .subCategory(ValidatorSubCategory.Status)
    .title('Pod Lifecycle Issues')

    .description(
`Kubevious can detect varies issues during the Pod lifecycle such as 
OOMKills, CrashLoopBackOffs, etc and raise corresponding alerts.
`)
    .affected('Pod')
.externalLink('https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/')

}