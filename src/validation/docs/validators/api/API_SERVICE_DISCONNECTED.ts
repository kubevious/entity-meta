import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupAPI_SERVICE_DISCONNECTED(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.API_SERVICE_DISCONNECTED)
    .category(ValidatorCategory.ApiServer)
    .title('Disconnected from Kubernetes API Server')
    .description(
`
This error happens if Kubevious Agent gets disconnected from Kubernetes API Services.
`)

}